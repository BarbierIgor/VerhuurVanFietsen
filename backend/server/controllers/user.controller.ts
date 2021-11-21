import { NextFunction, Request, Response, Router } from 'express'
import { User } from '../entity/user'
import admin from 'firebase-admin'
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
    this.router.post('/signup', this.createUser)
  }

  createUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const { email, password, name, isAdmin } = request.body

    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    })

    const newUser: User = {
      uuid: user.uid,
      username: request.body.name,
      isAdmin: false,
    }

    await this.repository.save(newUser)

    return response.json(user)
  }
}
