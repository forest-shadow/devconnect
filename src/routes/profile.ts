import express from 'express'

import API from '../constants/api'
import { AuthController } from '../controllers/AuthController'
import { ProfileController, createProfileValidators } from '../controllers/ProfileController'
import { ProfileExperienceController, addExperienceValidators } from '../controllers/ProfileExperienceController'
import { ProfileEducationController, addEducationValidators } from '../controllers/ProfileEducationController'
import { ProfileGithubController } from '../controllers/ProfileGithubController'

const router = express.Router()

// @route   GET api/profile/current
// @desc    Get current user's profile
// @access  Private
router.get(API.PROFILE.CURRENT, AuthController.tokenCheckout, ProfileController.getCurrent)

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(
  ['/', API.PROFILE.UPDATE],
  AuthController.tokenCheckout,
  createProfileValidators,
  ProfileController.create
)

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', ProfileController.getAll)

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get(API.PROFILE.GET_BY_USER_ID, ProfileController.getSingular)

// @route   DELETE api/profile
// @desc    Delete current profile, related user & posts
// @access  Private
router.delete('/', AuthController.tokenCheckout, ProfileController.delete)

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  API.PROFILE.EXPERIENCE.ADD,
  AuthController.tokenCheckout,
  addExperienceValidators,
  ProfileExperienceController.add
)

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete profile experience
// @access  Private
router.delete(
  API.PROFILE.EXPERIENCE.DELETE_BY_ID,
  AuthController.tokenCheckout,
  ProfileExperienceController.delete
)

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  API.PROFILE.EDUCATION.ADD,
  AuthController.tokenCheckout,
  addEducationValidators,
  ProfileEducationController.add
)

// @route   DELETE api/profile/education/:education_id
// @desc    Delete profile education
// @access  Private
router.delete(
  API.PROFILE.EDUCATION.DELETE_BY_ID,
  AuthController.tokenCheckout,
  ProfileEducationController.delete
)

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get(API.PROFILE.GITHUB.GET_USER_REPOS, ProfileGithubController.getRepos)

export default router
