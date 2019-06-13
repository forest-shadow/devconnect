import { Request, Response } from 'express'
import ProfileModel from '../../../models/Profile'

export const getAllProfilesMiddleware = async (req: Request, res: Response) => {
  try {
    const profiles = await ProfileModel.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
