import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import API from '../../constants/api'

import { userCredentialValidators, userRegistrationMiddleware } from './middleware/register'
import { tokenCheckout, userAuthMiddleware } from './middleware/auth'

const router = express.Router()

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get(API.USER.TEST, (req, res) => res.json({ msg: 'Users works!' }))

// @route GET api/users/register
// @desc Register user
// @access Public
router.post(API.USER.REGISTER, userCredentialValidators, userRegistrationMiddleware)

// @route GET api/users/auth
// @desc Login User / Returning JWT Token
// @access Protected
router.post(API.USER.AUTH, tokenCheckout, userAuthMiddleware)

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get(API.USER.CURRENT,
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, name, email } = req.user
    res.json({ id, name, email })
  }
)

export default router
