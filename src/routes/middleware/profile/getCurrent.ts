import { Response } from 'express'

import ProfileModel from '../../../models/Profile'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const getCurrentProfileMiddleware = async (req: AuthenticatedUserRequest, res: Response) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}
