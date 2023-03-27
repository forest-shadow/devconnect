import express from 'express'

import API from '../constants/api'

import { AuthController } from '../controllers/AuthController'
import { UserController, userRegisterValidators, userLoginValidators } from '../controllers/UserController'

const router = express.Router()

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post(API.USER.REGISTER, userRegisterValidators, UserController.register)

// @route   GET api/user/auth
// @desc    Authenticate User & Return appropriate JWT Token
// @access  Public
router.get(API.USER.AUTH, AuthController.tokenCheckout, UserController.getSingular)

// @route   POST api/user/login
// @desc    Login User & Return appropriate JWT Token
// @access  Public
router.post(API.USER.LOGIN, userLoginValidators, UserController.login)

router.delete('/', AuthController.tokenCheckout, UserController.deleteCurrent)

export default router
