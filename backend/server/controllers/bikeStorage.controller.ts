import { Request, Response, NextFunction, Router } from 'express'
import { BikeStorage } from '../entity/bikeStorage'
import { CrudController, IController, ICrudController } from './crud.controller'
import { checkIfAdmin } from '../auth/checkIfAdmin'

/**
 * The interface to use for every Bird Controller.
 */
export interface IBikeStorageController extends ICrudController, IController {
  test: string
}

export class BikeStorageController
  extends CrudController<BikeStorage>
  implements IBikeStorageController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(BikeStorage) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bikeStorages = await this.repository
        .createQueryBuilder('bikeStorages')
        .leftJoinAndSelect('bikeStorages.bikes', 'bike')
        .getMany()
      response.send(bikeStorages)
    } catch (error: any) {
      next(error)
    }
  }
}
