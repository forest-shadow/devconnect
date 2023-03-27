import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import PostModel from '../models/Post'
import ProfileModel from '../models/Profile'
import UserModel from '../models/User'

import getGravatarIcon from '../services/gravatar'
import { AuthenticatedUserRequest } from '../types/Request.types'
import { HTTP_STATUS_CODE } from '../types/HTTP.types'
import { httpStatusMessages } from '../constants/http'

const JWT_TOKEN_EXPIRATION_TIME = 360000
const USER_DELETED_MESSAGE = 'User deleted'
const INVALID_USER_CREDENTIALS_MESSAGE = 'Invalid Credentials'
const USER_EMAIL_ALREADY_EXIST_MESSAGE = 'Email already exists'

export const userLoginValidators = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
]
export const userRegisterValidators = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
]

export class UserController {
  static async deleteCurrent(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      await PostModel.deleteMany({ user: req.user.id })

      await UserModel.findOneAndRemove({ _id: req.user.id })
      await ProfileModel.findOneAndRemove({ user: req.user.id })

      return res.json({ msg: USER_DELETED_MESSAGE })
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async getSingular(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      // find user by email; return user without password
      const user = await UserModel.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      console.error(error.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR] })
    }
  }

  static async login(
    req: Request,
    res: Response
  ) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() })
    }

    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({ errors: [{ msg: INVALID_USER_CREDENTIALS_MESSAGE }] })
      }

      // check password matching
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({ errors: [{ msg: INVALID_USER_CREDENTIALS_MESSAGE }] })
      }

      // return jsonwebtoken in response
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: JWT_TOKEN_EXPIRATION_TIME },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      return res
        .status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
        .send({ error: httpStatusMessages[HTTP_STATUS_CODE.SERVICE_UNAVAILABLE] })
    }
  }

  static async register(
    req: Request,
    res: Response
  ) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, email, password } = req.body
      const user = await UserModel.findOne({ email })

      // see if user exists
      if (user) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json({ errors: [{ msg: USER_EMAIL_ALREADY_EXIST_MESSAGE }] })
      } else {
        // get users gravatar
        const avatar = getGravatarIcon(email)

        const newUser = new UserModel({ name, email, avatar, password })

        // encrypt password
        const passwordSalt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, passwordSalt)
        await newUser.save().catch(err => console.warn(err))

        // return jsonwebtoken in response
        const payload = {
          user: {
            id: newUser.id
          }
        }

        jwt.sign(
          payload,
          process.env.SECRET,
          { expiresIn: JWT_TOKEN_EXPIRATION_TIME },
          (err, token) => {
            if (err) throw err
            res.json({ token })
          }
        )
      }
    } catch (error) {
      console.error(error.message)
      return res
        .status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
        .send({ error: `Server Error: Can't create user. Reason: \n${error}` })
    }
  }
}