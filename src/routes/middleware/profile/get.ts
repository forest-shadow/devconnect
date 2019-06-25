import { Request, Response } from 'express'
import ProfileModel from '../../../models/Profile'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const getAllProfilesMiddleware = async (req: Request, res: Response) => {
  try {
    const profiles = await ProfileModel.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}

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
