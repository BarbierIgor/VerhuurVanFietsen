import { Request, Response, NextFunction, Router } from 'express'
import { getRepository } from 'typeorm'
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
    this.router.post('', this.save)
    this.router.put('/:id', this.update)
  }

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { user, bikeInUse } = request.body
      const inUseRepo = getRepository(BikeInUse)
      const bikeInUseItem: any = await inUseRepo
        .createQueryBuilder('bikeInUse')
        .leftJoinAndSelect('bikeInUse.bike', 'bike')
        .leftJoinAndSelect('bike.bikeStorage', 'bikeStorage')
        .where('bikeInUse.uuid =:id', { id: bikeInUse })
        .getOne()
      const currentDateTime = new Date()
      var diffMs = currentDateTime.getTime() - bikeInUseItem.timeHired.getTime() // milliseconds between
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)

      const prices: any = bikeInUseItem.bike.bikeStorage.prices
      const priceElectric = prices.electric
      const priceNonElectric = prices.nonElectric
      const priceEstep = prices.estep

      var price

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
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }
}
