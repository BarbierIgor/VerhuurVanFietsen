import { Request, Response, NextFunction, Router } from 'express'

import { Any, EntityTarget, getRepository, Repository } from 'typeorm'
import HttpException from '../exceptions/httpException'

/**
 * The interface with Express relations
 */
export interface IController {
  /**
   * the Express Router object
   */
  router: Router
}

/**
 * The interface to use for every Crud Controller.
 */
export interface ICrudController {
  all(request: Request, response: Response, next: NextFunction): void
  one(request: Request, response: Response, next: NextFunction): void
  save(request: Request, response: Response, next: NextFunction): void
  remove(request: Request, response: Response, next: NextFunction): void
}

/**
 * Extend from this class to use the repository functionalities
 * The T-parameter is initialized at the extending of the controller
 */
export class CrudController<T> implements ICrudController {
  public repository: Repository<T>

  constructor(model: EntityTarget<T>) {
    this.repository = getRepository(model)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const items = await this.repository.find()
      response.send(items)
    } catch (error: any) {
      next(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository.findOne(request.params.id)
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

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository.save(request.body)
      response.send(item)
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const itemToRemove = (await this.repository.findOne(
        request.params.id,
      )) as T
      await this.repository.remove(itemToRemove)
      response.send({
        message: 'Successfully removed',
        datetime: Date.now().toString(),
      })
    } catch (error: any) {
      error.status = 404
      next(error)
    }
  }
}
