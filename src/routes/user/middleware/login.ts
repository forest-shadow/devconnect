import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// TODO: figure out absolute path usage
import User from '../../../models/User'
import getGravatarIcon from '../../../services/gravatar'

export const userLoginValidators = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
]

export const userLoginMiddleware = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] })
    }

    // check password matching
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] })
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
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    console.error(error.message)
    return res.status(503).send({ error: `Server Error: Can't create user. Reason: \n${error}` })
  }
}