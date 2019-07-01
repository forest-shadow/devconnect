import express from 'express'

import API from '../constants/api'
import { createPostValidators, createPostMiddleware } from './middleware/post/create'
import { getPostsMiddleware, getPostMiddleware } from './middleware/post/get'
import { deletePostMiddleware } from './middleware/post/delete'
import { likePostMiddleware, unlikePostMiddleware } from './middleware/post/like'
import {
  createCommentValidators,
  createCommentMiddleware,
  deleteCommentMiddleware
} from './middleware/post/comment'
import { tokenCheckout } from './middleware/tokenCheckout'

const router = express.Router()

// @route   POST api/post
// @desc    Create a post
// @access  Public
router.post('/', tokenCheckout, createPostValidators, createPostMiddleware)

// @route   GET api/post
// @desc    Get all posts
// @access  Private
router.get('/', tokenCheckout, getPostsMiddleware)

// @route   GET api/post/:post_id
// @desc    Get post by id
// @access  Private
router.get(API.POST.GET_BY_ID, tokenCheckout, getPostMiddleware)

// @route   DELETE api/post/:post_id
// @desc    Delete post by id
// @access  Private
router.delete(API.POST.DELETE, tokenCheckout, deletePostMiddleware)

// @route   PUT api/post/:post_id/like
// @desc    Like a post
// @access  Private
router.put(API.POST.ASSESS.LIKE, tokenCheckout, likePostMiddleware)

// @route   PUT api/post/:post_id/unlike
// @desc    Unlike a post
// @access  Private
router.put(API.POST.ASSESS.UNLIKE, tokenCheckout, unlikePostMiddleware)

// @route   POST api/post/:post_id/comment
// @desc    Comment on a post
// @access  Private
router.post(API.POST.COMMENT.ADD, tokenCheckout, createCommentValidators, createCommentMiddleware)

// @route   Delete api/post/:post_id/comment/:comment_id
// @desc    Delete comment on a post
// @access  Private
router.delete(API.POST.COMMENT.DELETE, tokenCheckout, deleteCommentMiddleware)

export default router
