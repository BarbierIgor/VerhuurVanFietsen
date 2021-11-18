import { Router } from 'express'
import { HiredHistory } from '../entity/hiredHistory'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Bird Controller.
 */
export interface IHiredHistoryController extends ICrudController, IController {
  test: string
}

export class HiredHistoryController
  extends CrudController<HiredHistory>
  implements IHiredHistoryController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(HiredHistory) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
  }
}
