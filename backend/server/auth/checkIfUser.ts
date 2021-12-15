import { Request } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/user'
import { parseJwt } from './parseJwt'

export const checkIfUser = async (request: Request) => {
  let repository = getRepository(User)
  const token = request.headers.authorization?.replace('Bearer ', '')
  const tokeninfo = parseJwt(token)
  const item = await repository.findOne(tokeninfo.user_id)
  if (
    item?.uuid === request.params.id ||
    item?.uuid === request.body.user ||
    item?.uuid === request.body.id ||
    item?.uuid === request.body.uuid
  ) {
    return true
  } else {
    return false
  }
}
