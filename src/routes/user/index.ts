import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import API from '../../constants/api'

import { userRegisterValidators, userRegisterMiddleware } from './middleware/register'
import { tokenCheckout, userAuthMiddleware } from './middleware/auth'
import { userLoginValidators, userLoginMiddleware } from './middleware/login'

const router = express.Router()

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get(API.USER.TEST, (req, res) => res.json({ msg: 'Users works!' }))

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post(API.USER.REGISTER, userRegisterValidators, userRegisterMiddleware)

// @route   POST api/user/auth
// @desc    Authenticate User & Return appropriate JWT Token
// @access  Public
router.post(API.USER.AUTH, tokenCheckout, userAuthMiddleware)

// @route   POST api/user/login
// @desc    Login User & Return appropriate JWT Token
// @access  Public
router.post(API.USER.LOGIN, userLoginValidators, userLoginMiddleware)

// @route   GET api/user/current
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
