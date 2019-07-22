import { Response } from 'express'

import UserModel from '../../../models/User'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const userAuthMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    // find user by email; return user without password
    const user = await UserModel.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: `Unexpected server error.` })
  }
}
