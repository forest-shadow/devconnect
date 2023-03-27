import express from 'express'

import API from '../constants/api'

import {
  userRegisterValidators,
  userRegisterMiddleware
} from './middleware/user/register'
import { userAuthMiddleware } from './middleware/user/auth'
import {
  userLoginValidators,
  userLoginMiddleware
} from './middleware/user/login'
import { deleteCurrentUserMiddleware } from './middleware/user/deleteCurrent'
import { AuthController } from '../controllers/AuthController'

const router = express.Router()

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post(API.USER.REGISTER, userRegisterValidators, userRegisterMiddleware)

// @route   GET api/user/auth
// @desc    Authenticate User & Return appropriate JWT Token
// @access  Public
router.get(API.USER.AUTH, AuthController.tokenCheckout, userAuthMiddleware)

// @route   POST api/user/login
// @desc    Login User & Return appropriate JWT Token
// @access  Public
router.post(API.USER.LOGIN, userLoginValidators, userLoginMiddleware)

router.delete('/', AuthController.tokenCheckout, deleteCurrentUserMiddleware)

export default router
