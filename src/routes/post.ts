import express from 'express'

import API from '../constants/api'

import { AuthController } from '../controllers/AuthController'
import { PostController, createPostValidators } from '../controllers/PostController'
import { PostCommentController, createCommentValidators } from '../controllers/PostCommentController'

const router = express.Router()

// @route   POST api/post
// @desc    Create a post
// @access  Public
router.post('/', AuthController.tokenCheckout, createPostValidators, PostController.create)

// @route   GET api/post
// @desc    Get all posts
// @access  Private
router.get('/', AuthController.tokenCheckout, PostController.getAll)

// @route   GET api/post/:post_id
// @desc    Get post by id
// @access  Private
router.get(API.POST.GET_BY_ID, AuthController.tokenCheckout, PostController.getSingular)

// @route   DELETE api/post/:post_id
// @desc    Delete post by id
// @access  Private
router.delete(API.POST.DELETE, AuthController.tokenCheckout, PostController.delete)

// @route   PUT api/post/:post_id/like
// @desc    Like a post
// @access  Private
router.put(API.POST.ASSESS.LIKE, AuthController.tokenCheckout, PostController.like)

// @route   PUT api/post/:post_id/unlike
// @desc    Unlike a post
// @access  Private
router.put(API.POST.ASSESS.UNLIKE, AuthController.tokenCheckout, PostController.unlike)

// @route   POST api/post/:post_id/comment
// @desc    Comment on a post
// @access  Private
router.post(
  API.POST.COMMENT.ADD,
  AuthController.tokenCheckout,
  createCommentValidators,
  PostCommentController.create
)

// @route   Delete api/post/:post_id/comment/:comment_id
// @desc    Delete comment on a post
// @access  Private
router.delete(API.POST.COMMENT.DELETE, AuthController.tokenCheckout, PostCommentController.delete)

export default router
