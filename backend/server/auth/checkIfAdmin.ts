import { Request } from 'express'
import { EntityTarget, getRepository, Repository } from 'typeorm'
import { User } from '../entity/user'

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

function parseJwt(token: any) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}
