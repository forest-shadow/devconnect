import express from 'express'

import API from '../constants/api'
import { tokenCheckout } from './middleware/auth'
import { getCurrentProfileMiddleware } from './middleware/profile/current'


const router = express.Router()

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get(API.PROFILE.TEST, (req, res) => res.json({ msg: 'Profile works!' }))

// @route   POST api/profile/current
// @desc    Get current user's profile
// @access  Private
router.post(API.PROFILE.CURRENT, tokenCheckout, getCurrentProfileMiddleware)

export default router
