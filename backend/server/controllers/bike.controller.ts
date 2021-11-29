import { Request, Response, NextFunction, Router } from 'express'
import { Bike } from '../entity/bike'
import HttpException from '../exceptions/httpException'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IBikeController extends ICrudController, IController {
  test: string
}

export class BikeController
  extends CrudController<Bike>
  implements IBikeController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Bike) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.get('/type/:type', this.byType)
    this.router.post('', this.save)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bikes = await this.repository
        .createQueryBuilder('bikes')
        .leftJoinAndSelect('bikes.bikeStorage', 'bikeStorage')
        .getMany()
      response.send(bikes)
    } catch (error: any) {
      next(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository
        .createQueryBuilder('bike')
        .leftJoinAndSelect('bike.bikeStorage', 'bikeStorage')
        .where('bike.uuid = :id', { id: request.params.id })
        .getOne()
      if (item) {
        response.send(item)
      } else {
        next(
          new HttpException(404, `No item found with id: ${request.params.id}`),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  byType = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bikes = await this.repository
        .createQueryBuilder('bikes')
        .where('bikes.type = :type', { type: request.params.type })
        .leftJoinAndSelect('bikes.bikeStorage', 'bikeStorage')
        .getMany()
      if (bikes.length != 0) {
        response.send(bikes)
      } else {
        next(
          new HttpException(
            404,
            `No bikes found with type: ${request.params.type}`,
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }
}
