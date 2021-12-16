import { Request, Response, NextFunction, Router } from 'express'
import { checkIfAdmin } from '../auth/checkIfAdmin'
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
    this.router.put('/addimage/:id', this.addImageUrl)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const problems = await this.repository
        .createQueryBuilder('problems')
        .leftJoinAndSelect('problems.bike', 'bike')
        .leftJoinAndSelect('problems.bikeStorage', 'bikeStorage')
        .getMany()
      response.send(problems)
    } catch (error: any) {
      next(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository
        .createQueryBuilder('problem')
        .leftJoinAndSelect('problem.bike', 'bike')
        .leftJoinAndSelect('problem.bikeStorage', 'bikeStorage')
        .where('problem.id = :id', { id: request.params.id })
        .getOne()
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
      const { description, category, bikeId, bikeStorageId } = request.body
      const newProblem: Problem = {
        description: description,
        category,
        bike: bikeId,
        bikeStorage: bikeStorageId,
        date: new Date(),
        imageUrls: new Array<string>(),
      }
      const item = await this.repository.save(newProblem)
      response.send(item)
    } catch (error: any) {
      error.status = 400
      next(error)
    }
  }

  addImageUrl = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { imageUrl } = request.body
      const item: any = await this.repository.findOne(request.params.id)
      item.imageUrls.push(imageUrl)

      const result = await this.repository.save(item)
      return response.send(result)
    } catch (error: any) {
      console.log(error)
      error.status = 400
      next(error)
    }
  }

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isAdmin = await checkIfAdmin(request)
      if (isAdmin) {
        const itemToRemove: any = await this.repository.findOne(
          request.params.id,
        )
        await this.repository.remove(itemToRemove)
        response.send({
          message: 'Successfully removed',
          datetime: Date.now().toString(),
        })
      } else {
        next(
          new HttpException(
            403,
            'You do not have the permission to delete a problem',
          ),
        )
      }
    } catch (error: any) {
      error.status = 404
      next(error)
    }
  }
}
