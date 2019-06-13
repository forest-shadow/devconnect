import { Request, Response } from 'express'

import Profile from '../../../models/Profile'
import User from '../../../models/User'

export const getCurrentProfileMiddleware = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
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
