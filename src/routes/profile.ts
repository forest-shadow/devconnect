import express from 'express'

import API from '../constants/api'
import { tokenCheckout } from './middleware/tokenCheckout'
import { getCurrentProfileMiddleware } from './middleware/profile/getCurrent'
import { createProfileValidators, createProfileMiddleware } from './middleware/profile/create'
import { getAllProfilesMiddleware } from './middleware/profile/getAll'
import { getProfileByUserIdMiddleware } from './middleware/profile/getByUserId'
import { deleteCurrentProfileMiddleware } from './middleware/profile/deleteCurrent'
import {
  addExperienceValidators,
  addExperienceMiddleware,
  deleteExperienceMiddleware
} from './middleware/profile/experience'
import {
  addEducationMiddleware,
  addEducationValidators,
  deleteEducationMiddleware
} from './middleware/profile/education'


const router = express.Router()

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get(API.PROFILE.TEST, (req, res) => res.json({ msg: 'Profile works!' }))

// @route   POST api/profile/current
// @desc    Get current user's profile
// @access  Private
router.post(API.PROFILE.CURRENT, tokenCheckout, getCurrentProfileMiddleware)

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(['/', API.PROFILE.UPDATE], tokenCheckout, createProfileValidators, createProfileMiddleware)

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfilesMiddleware)

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get(API.PROFILE.GET_BY_USER_ID, getProfileByUserIdMiddleware)

// @route   DELETE api/profile
// @desc    Delete current profile, related user & posts
// @access  Private
router.delete('/', tokenCheckout, deleteCurrentProfileMiddleware)

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(API.PROFILE.EXPERIENCE.ADD, tokenCheckout, addExperienceValidators, addExperienceMiddleware)

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete profile experience
// @access  Private
router.delete(API.PROFILE.EXPERIENCE.DELETE_BY_ID, tokenCheckout, deleteExperienceMiddleware)

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(API.PROFILE.EXPERIENCE.ADD, tokenCheckout, addEducationValidators, addEducationMiddleware)

// @route   DELETE api/profile/education/:education_id
// @desc    Delete profile education
// @access  Private
router.delete(API.PROFILE.EXPERIENCE.DELETE_BY_ID, tokenCheckout, deleteEducationMiddleware)


export default router
