import express from 'express'

import { createPostValidators, createPostMiddleware } from './middleware/post/create'
import { tokenCheckout } from './middleware/tokenCheckout'

const router = express.Router()

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post('/', tokenCheckout, createPostValidators, createPostMiddleware)

export default router
