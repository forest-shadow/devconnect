import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import bcrypt from 'bcryptjs'

import User from '../../models/User'
import { getGravatarIcon } from '../../services/gravatar'

export const userCredentialValidators = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
]

export const userRegistrationMiddleware = async (req: Request, res: Response) => {
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
        // return jsonwebtoken in response
        .then(user => res.json(user))
        .catch(err => console.warn(err))
    }
  } catch (error) {
    console.error(error.message)
    return res.status(503).send({ error: `Server Error: Can't create user. Reason: \n${error}` })
  }
}