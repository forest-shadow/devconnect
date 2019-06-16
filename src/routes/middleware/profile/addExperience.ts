import { Response } from 'express'
import { check, validationResult } from 'express-validator/check'

import ProfileModel from '../../../models/Profile'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const addExperienceValidators = [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
]

export const addExperienceMiddleware = async (req: AuthenticatedUserRequest, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const { title, company, location, from, to, current, description } = req.body
  const newExperience = { title, company, location, from, to, current, description }

  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    profile.experience.unshift(newExperience)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
