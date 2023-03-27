import { Request } from 'express'
import { User } from './User.types'

export interface AuthenticatedUserRequest extends Request {
  user: User
}