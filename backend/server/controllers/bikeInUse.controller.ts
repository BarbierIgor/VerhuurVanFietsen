import { Request, Response, NextFunction, Router } from 'express'
import { BikeInUse } from '../entity/bikeInUse'
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
    this.router.post('', this.save)
    this.router.delete('/:id', this.remove)
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
