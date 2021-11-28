import { NextFunction, Request, Response, Router } from 'express'
import { User } from '../entity/user'
import admin from 'firebase-admin'
import { CrudController, IController, ICrudController } from './crud.controller'
import { checkIfAdmin } from '../auth/checkIfAdmin'
import HttpException from '../exceptions/httpException'

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

    this.router.post('/signup/admin', this.createAdmin)
  }

  createUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password, name } = request.body

      const user = await admin.auth().createUser({
        email,
        password,
        displayName: name,
      })

      const newUser: User = {
        uuid: user.uid,
        username: request.body.name,
        isAdmin: false,
        wallet: 0,
      }

      await this.repository.save(newUser)

      return response.json(user)
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }

  createAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const isAdmin = await checkIfAdmin(request)
      if (isAdmin) {
        const { email, password, name } = request.body

        const user = await admin.auth().createUser({
          email,
          password,
          displayName: name,
        })

        const newUser: User = {
          uuid: user.uid,
          username: request.body.name,
          isAdmin: true,
        }

        await this.repository.save(newUser)

        return response.json(user)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permissoin to create a admin account',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }
}
