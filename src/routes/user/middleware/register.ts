import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// TODO: figure out absolute path usage
import User from '../../../models/User'
import getGravatarIcon from '../../../services/gravatar'

export const userRegisterValidators = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
]

export const userRegisterMiddleware = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })

    // see if user exists
    if (user) {
      return res.status(400).json({ errors: [ { msg: 'Email already exists' } ] })
    } else {
      // get users gravatar
      const avatar = getGravatarIcon(email)

      const newUser = new User({ name, email, avatar, password })

      // encrypt password
      const passwordSalt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, passwordSalt)
      await newUser.save()
        .catch(err => console.warn(err))

      // return jsonwebtoken in response
      const payload = {
        user: {
          id: newUser.id
        }
      }

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    }
  } catch (error) {
    console.error(error.message)
    return res.status(503).send({ error: `Server Error: Can't create user. Reason: \n${error}` })
  }
}