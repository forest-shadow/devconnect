import { Response } from 'express'
import { check, validationResult } from 'express-validator'

import ProfileModel from '../../../models/Profile'
import { AuthenticatedUserRequest } from '../../../interfaces/request'
import { Education } from '../../../interfaces/profile'

export const addEducationValidators = [
  check('school', 'School is required')
    .not()
    .isEmpty(),
  check('degree', 'Degree is required')
    .not()
    .isEmpty(),
  check('fieldOfStudy', 'Field of study is required')
    .not()
    .isEmpty(),
  check('from', 'From date is required')
    .not()
    .isEmpty()
]

export const addEducationMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body
  const newEducation: Education = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    profile.education.unshift(newEducation)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}

export const deleteEducationMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id })
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.education_id)

    profile.education.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
