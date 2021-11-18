import { Request, Response, NextFunction, Router } from 'express'
import { BicycleStorage } from '../entity/bicycleStorage'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IBicycleStorageController
  extends ICrudController,
    IController {
  test: string
}

export class BicycleStorageController
  extends CrudController<BicycleStorage>
  implements IBicycleStorageController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(BicycleStorage) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    const bicycleStorages = await this.repository
      .createQueryBuilder('bicycleStorages')
      .leftJoinAndSelect('bicycleStorages.bikes', 'bike')
      .getMany()
    response.send(bicycleStorages)
  }
}
