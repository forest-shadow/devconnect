import { Request } from 'express'
import { User } from './user'

export interface AuthenticatedUserRequest extends Request {
  user: User
}