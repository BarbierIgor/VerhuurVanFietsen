import { Request, Response, NextFunction, Router } from 'express'
import { BikeStorage } from '../entity/bikeStorage'
import { CrudController, IController, ICrudController } from './crud.controller'
import { checkIfAdmin } from '../auth/checkIfAdmin'
import HttpException from '../exceptions/httpException'

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
    this.router.delete('/:id', this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bikeStorages = await this.repository
        .createQueryBuilder('bikeStorages')
        .leftJoinAndSelect('bikeStorages.bikes', 'bike')
        .getMany()
      bikeStorages.forEach(item => {
        var counter = 0
        item.bikes?.forEach(element => {
          if (element.inStorage === true) {
            counter += 1
          }
        })
        item.bikesAvailable = counter
      })
      response.send(bikeStorages)
    } catch (error: any) {
      next(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      var counter = 0
      const bikeStorage = await this.repository
        .createQueryBuilder('bikeStorage')
        .leftJoinAndSelect('bikeStorage.bikes', 'bike')
        .where('bikeStorage.id = :id', { id: request.params.id })
        .getOne()
      if (bikeStorage) {
        bikeStorage?.bikes?.forEach(item => {
          // console.log(item)
          if (item.inStorage === true) {
            counter += 1
          }
        })
        bikeStorage!.bikesAvailable = counter
        response.send(bikeStorage)
      } else {
        next(
          new HttpException(404, `No item found with id: ${request.params.id}`),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }
}
