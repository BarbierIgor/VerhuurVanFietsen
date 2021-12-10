import { Request, Response, NextFunction, Router } from 'express'
import { Problem } from '../entity/problem'
import HttpException from '../exceptions/httpException'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IProblemController extends ICrudController, IController {
  test: string
}

export class ProblemController
  extends CrudController<Problem>
  implements IProblemController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Problem) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
    this.router.delete('/:id', this.remove)
  }
}
