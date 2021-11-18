import { Router } from 'express'
import { Review } from '../entity/review'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IReviewController extends ICrudController, IController {
  test: string
}

export class ReviewController
  extends CrudController<Review>
  implements IReviewController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Review) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
  }
}
