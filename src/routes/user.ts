import express from 'express'

import API from '../constants/api'

import { userRegisterValidators, userRegisterMiddleware } from './middleware/user/register'
import { tokenCheckout, userAuthMiddleware } from './middleware/auth'
import { userLoginValidators, userLoginMiddleware } from './middleware/user/login'

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

export default router
