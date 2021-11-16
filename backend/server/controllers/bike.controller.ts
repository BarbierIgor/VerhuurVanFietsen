import { Request, Response, NextFunction, Router } from 'express'
import { Bike } from '../entity/bike'
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
    this.router.post('', this.save)
  }

  // all = async (request: Request, response: Response, next: NextFunction) => {
  //   const bikes = await this.repository.find({
  //     relations: ['birdObservations'],
  //   })
  //   console.log(`Getting all the bikes!`)
  //   response.send(bikes)
  // }
}
