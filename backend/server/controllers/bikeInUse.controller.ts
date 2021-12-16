import { Request, Response, NextFunction, Router } from 'express'
import { checkIfAdmin } from '../auth/checkIfAdmin'
import { checkIfUser } from '../auth/checkIfUser'
import { BikeInUse } from '../entity/bikeInUse'
import HttpException from '../exceptions/httpException'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IBikeInUseController extends ICrudController, IController {
  test: string
}

export class BikeInUseController
  extends CrudController<BikeInUse>
  implements IBikeInUseController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(BikeInUse) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.get('/user/:id', this.byUser)
    this.router.post('', this.save)
    this.router.delete('/:id', this.remove)
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
            'You do not have the permission to get all the bikes in use',
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
          .where('bikeInUse.userId = :id', { id: request.params.id })
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
      const { bike, user } = request.body
      const newItem: BikeInUse = {
        bike,
        user,
        timeHired: new Date(),
      }
      const item = await this.repository.save(newItem)
      response.send(item)
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }
}
