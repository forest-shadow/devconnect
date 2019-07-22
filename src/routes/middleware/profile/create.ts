import { Response } from 'express'
import { check, validationResult } from 'express-validator/check'

import ProfileModel from '../../../models/Profile'
import { Profile, SocialLinks } from '../../../interfaces/profile'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const createProfileValidators = [
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty()
]

export const createProfileMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  // build profile object
  const profileFields = {} as Profile
  profileFields.user = req.user.id
  if (company) profileFields.company = company
  if (website) profileFields.website = website
  if (location) profileFields.location = location
  if (bio) profileFields.bio = bio
  if (status) profileFields.status = status
  if (githubUsername) profileFields.githubUsername = githubUsername
  if (skills) {
    profileFields.skills = skills
      .split(',')
      .map((skill: string) => skill.trim())
  }

  // build social object
  profileFields.social = {} as SocialLinks
  if (youtube) profileFields.social.youtube = youtube
  if (twitter) profileFields.social.twitter = twitter
  if (facebook) profileFields.social.facebook = facebook
  if (linkedin) profileFields.social.linkedin = linkedin
  if (instagram) profileFields.social.instagram = instagram

  try {
    let profile = await ProfileModel.findOne({ user: req.user.id })

    if (profile) {
      // update
      profile = await ProfileModel.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )

      return res.json(profile)
    }

    // create
    profile = new ProfileModel(profileFields)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}
