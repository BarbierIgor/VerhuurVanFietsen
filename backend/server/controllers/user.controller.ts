import { NextFunction, Request, Response, Router } from 'express'
import { User } from '../entity/user'
import admin from 'firebase-admin'
import { CrudController, IController, ICrudController } from './crud.controller'
import { checkIfAdmin } from '../auth/checkIfAdmin'
import { checkIfUser } from '../auth/checkIfUser'
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
    this.router.put('/:id', this.updateUser)
    this.router.post('/signup', this.createUser)
    this.router.post('/signup/admin', this.createAdmin)
    this.router.delete('/:id', this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isAdmin = await checkIfAdmin(request)

      if (isAdmin) {
        const items = await this.repository.find()
        response.send(items)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to get all the accounts',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isAdmin = await checkIfAdmin(request)
      const isUser = await checkIfUser(request, request.params.id)

      if (isAdmin || isUser) {
        const item = await this.repository.findOne(request.params.id)
        if (item) {
          response.send(item)
        } else {
          next(
            new HttpException(
              404,
              `No item found with id: ${request.params.id}`,
            ),
          )
        }
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to get other then your own account',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isUser = await checkIfUser(request, request.params.id)
      if (isUser) {
        const itemToRemove = await this.repository.findOne(request.params.id)
        if (itemToRemove) {
          await this.repository.remove(itemToRemove)
          response.send({
            message: 'Successfully removed',
            datetime: Date.now().toString(),
          })
        } else {
          next(new HttpException(404, 'Item with id not found'))
        }
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to delete other then your own account',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
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
            'You do not have the permission to create a admin account',
          ),
        )
      }
    } catch (error: any) {
      next(error)
    }
  }

  updateUser = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { uuid, username, wallet } = request.body
      const isUser = await checkIfUser(request, request.params.id)
      if (isUser) {
        const user: any = await this.repository.findOne(request.params.id)
        const newUser: User = {
          uuid: uuid,
          username: username,
          wallet: wallet,
          isAdmin: user.isAdmin,
        }
        this.repository.merge(user, newUser)
        const result = await this.repository.save(user)
        return response.send(result)
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to modify other then your own account',
          ),
        )
      }
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }
}
