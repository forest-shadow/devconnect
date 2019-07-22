import { Response } from 'express'

import ProfileModel from '../../../models/Profile'
import UserModel from '../../../models/User'
import PostModel from '../../../models/Post'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const deleteCurrentUserMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    await PostModel.deleteMany({ user: req.user.id })

    await UserModel.findOneAndRemove({ _id: req.user.id })
    await ProfileModel.findOneAndRemove({ user: req.user.id })

    return res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
