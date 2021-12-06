import { Request } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/user'
import { parseJwt } from './parseJwt'

export const checkIfAdmin = async (request: Request) => {
  let repository = getRepository(User)
  const token = request.headers.authorization?.replace('Bearer ', '')
  const tokeninfo = parseJwt(token)
  const item = await repository.findOne(tokeninfo.user_id)

  if (item?.isAdmin) {
    return true
  } else {
    return false
  }
}
