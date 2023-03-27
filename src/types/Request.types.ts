import { Request } from 'express'
import { User } from '../interfaces/user'

export interface AuthenticatedUserRequest extends Request {
  user: User
}