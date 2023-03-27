import { check, validationResult } from 'express-validator'
import { AuthenticatedUserRequest } from '../interfaces/request'
import { Response } from 'express'
import { Experience } from '../interfaces/profile'
import ProfileModel from '../models/Profile'
import { HTTP_STATUS_CODE } from '../types/HTTP.types'
import { httpStatusMessages } from '../constants/http'

export const addExperienceValidators = [
  check('title', 'Title is required')
    .not()
    .isEmpty(),
  check('company', 'Company is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty()
]

export class ProfileExperienceController {
  static async add(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: errors.array })
    }

    const { title, company, location, from, to, current, description } = req.body
    const newExperience: Experience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await ProfileModel.findOne({ user: req.user.id })
      profile.experience.unshift(newExperience)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async delete(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const profile = await ProfileModel.findOne({ user: req.user.id })
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.experience_id)

      profile.experience.splice(removeIndex, 1)
      await profile.save()
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }
}