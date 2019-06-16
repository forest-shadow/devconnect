import { Request, Response } from 'express'
import ProfileModel from '../../../models/Profile'
import UserModel from '../../../models/User'

export const deleteCurrentProfileMiddleware = async (req: Request, res: Response) => {
  try {
    // TODO: remove users posts
    await ProfileModel.findOneAndRemove({ user: req.user.id })
    await UserModel.findOneAndRemove({ _id: req.user.id })
    return res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
