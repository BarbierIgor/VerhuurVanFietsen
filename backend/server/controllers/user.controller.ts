import { Router } from 'express'
import { User } from '../entity/user'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IUserController extends ICrudController, IController {
  test: string
}

export class UserController
  extends CrudController<User>
  implements IUserController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(User) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
  }
}
