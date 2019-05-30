import express, { Request, Response } from 'express'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { check, validationResult } from 'express-validator/check'

import User from '../../models/User'
import API from '../../constants/API'

const router = express.Router()

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get(API.USERS.TEST, (req, res) => res.json({ msg: 'Users works!' }))

// @route GET api/users/register
// @desc Register user
// @access Public
router.post(
  API.USERS.REGISTER,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()})
    }

    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ email: 'Email already exists' })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })


        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.warn(err))
          })
        })
      }
    } catch (error) {
      return res.status(503).json({ error: `Error: Can't create user. Reason: \n${error}` })
    }
  }
)

// @route GET api/users/login
// @desc Login User / Returning JWT Token
// @access Protected
router.post(API.USERS.LOGIN, async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  try {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ email: 'User nor found' })
    }

    // Check Password
    bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          // User Matched

          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }

          // Sign Token
          jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })

          })
        } else {
          return res.status(400).json({ password: 'Password incorrect' })
        }
      })
  } catch (error) {
    return res.status(500).json({ error: `Unexpected server error.` })
  }

})

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get(API.USERS.CURRENT,
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user
    res.json({ id, name, email })
  }
)

export default router
