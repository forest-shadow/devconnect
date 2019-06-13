import { Request, Response } from 'express'

import ProfileModel from '../../../models/Profile'

export const getProfileByUserIdMiddleware = async (req: Request, res: Response) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.params.user_id })

    if (!profile) return res.status(400).send({ msg: 'Profile not found' })
    return res.json(profile)
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(400).send({ msg: 'Profile not found' })
    }
    return res.status(500).send('Server Error')
  }
}
