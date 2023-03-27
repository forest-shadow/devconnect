import { AuthenticatedUserRequest } from '../types/Request.types'
import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import { Profile, SocialLinks } from '../types/Profile.types'
import ProfileModel from '../models/Profile'
import { HTTP_ERROR_KIND, HTTP_STATUS_CODE } from '../types/HTTP.types'
import { httpStatusMessages } from '../constants/http'
import UserModel from '../models/User'

const PROFILE_NOT_FOUND_MESSAGE = 'Profile not found'
const USER_DELETED_MESSAGE = 'User deleted'
const NO_USER_PROFILE_MESSAGE = 'There is no profile for this user'
export const createProfileValidators = [
  check('status', 'Status is required')
    .not()
    .isEmpty(),
  check('skills', 'Skills is required')
    .not()
    .isEmpty()
]

export class ProfileController {
  static async create(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() })
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
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async delete(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      // TODO: remove users posts
      await ProfileModel.findOneAndRemove({ user: req.user.id })
      await UserModel.findOneAndRemove({ _id: req.user.id })
      return res.json({ msg: USER_DELETED_MESSAGE })
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async getAll(
    req: Request,
    res: Response
  ) {
    try {
      const profiles = await ProfileModel.find().populate('user', [
        'name',
        'avatar'
      ])
      return res.json(profiles)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async getSingular(
    req: Request,
    res: Response
  ) {
    try {
      const profile = await ProfileModel.findOne({ user: req.params.user_id }).populate('user')

      if (!profile) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ msg: PROFILE_NOT_FOUND_MESSAGE})
      return res.json(profile)
    } catch (err) {
      console.error(err.message)

      if (err.kind === HTTP_ERROR_KIND.OBJECT_ID) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({ msg: PROFILE_NOT_FOUND_MESSAGE })
      }
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async getCurrent(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
        'user',
        ['name', 'avatar']
      )

      if (!profile) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ msg: NO_USER_PROFILE_MESSAGE })
      }

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }
}