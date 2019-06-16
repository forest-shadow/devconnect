import express from 'express'

import API from '../constants/api'

import { userRegisterValidators, userRegisterMiddleware } from './middleware/user/register'
import { tokenCheckout } from './middleware/tokenCheckout'
import { userAuthMiddleware } from './middleware/user/auth'
import { userLoginValidators, userLoginMiddleware } from './middleware/user/login'

const router = express.Router()

// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get(API.USER.TEST, (req, res) => res.json({ msg: 'User works!' }))

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

export default router
