import { Request, Response, NextFunction, Router } from 'express'
import { getRepository } from 'typeorm'
import { checkIfAdmin } from '../auth/checkIfAdmin'
import { checkIfUser } from '../auth/checkIfUser'
import { BikeInUse } from '../entity/bikeInUse'
import { HiredHistory } from '../entity/hiredHistory'
import HttpException from '../exceptions/httpException'
import { BikeInUseController } from './bikeInUse.controller'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IHiredHistoryController extends ICrudController, IController {
  test: string
}

export class HiredHistoryController
  extends CrudController<HiredHistory>
  implements IHiredHistoryController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(HiredHistory) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.get('/user/:id', this.byUser)
    this.router.post('', this.save)
    this.router.put('/:id', this.update)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isAdmin = await checkIfAdmin(request)

      if (isAdmin) {
        const items = await this.repository.find()
        response.send(items)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to get all the orders',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  byUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isUser = await checkIfUser(request)

      if (isUser) {
        const item = await this.repository
          .createQueryBuilder('hiredHistory')
          .where('hiredHistory.userId = :id', { id: request.params.id })
          .getMany()

        response.send(item)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to get orders of other users',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isUser = await checkIfUser(request)

      if (isUser) {
        const { user, bikeInUse } = request.body
        const inUseRepo = getRepository(BikeInUse)
        const bikeInUseItem: any = await inUseRepo
          .createQueryBuilder('bikeInUse')
          .leftJoinAndSelect('bikeInUse.bike', 'bike')
          .leftJoinAndSelect('bike.bikeStorage', 'bikeStorage')
          .where('bikeInUse.uuid =:id', { id: bikeInUse })
          .getOne()
        const currentDateTime = new Date()
        var diffMs =
          currentDateTime.getTime() - bikeInUseItem.timeHired.getTime() // milliseconds between
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)

        const prices: any = bikeInUseItem.bike.bikeStorage.prices
        const priceElectric = prices.electric
        const priceNonElectric = prices.nonElectric
        const priceEstep = prices.estep

        var price = 0

        if (bikeInUseItem.bike.type === 'electric') {
          price = Math.round((priceElectric / 60) * diffMins * 100) / 100
        } else if (bikeInUseItem.bike.type === 'nonElectric') {
          price = Math.round((priceNonElectric / 60) * diffMins * 100) / 100
        } else if (bikeInUseItem.bike.type === 'estep') {
          price = Math.round((priceEstep / 60) * diffMins * 100) / 100
        }

        const newItem: HiredHistory = {
          user,
          bike: bikeInUseItem.bike,
          price: price,
          paid: false,
          timeHiredStart: bikeInUseItem.timeHired,
          timeHiredEnd: currentDateTime,
        }
        const item = await this.repository.save(newItem)
        await inUseRepo.remove(bikeInUseItem)
        response.send(item)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to post for other users',
          ),
        )
      }
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }
}
