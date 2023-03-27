import { check, validationResult } from 'express-validator'
import { AuthenticatedUserRequest } from '../interfaces/request'
import { Response } from 'express'
import UserModel from '../models/User'
import PostModel from '../models/Post'
import { HTTP_ERROR_KIND, HTTP_STATUS_CODE } from '../types/HTTP.types'
import { httpStatusMessages } from '../constants/http'

const POST_NOT_FOUND_MESSAGE = 'Post not found'
const POST_ALREADY_LIKED_MESSAGE = 'Post already liked'
const POST_NOT_ALREADY_LIKED_MESSAGE = 'Post has not yet been liked'

export const createPostValidators = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]
export class PostController {
  static async create(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ errors: errors.array() })
    }

    try {
      const user = await UserModel.findById(req.user.id).select('-password')

      const newPost = new PostModel({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })

      const post = await newPost.save()
      return res.json(post)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async delete(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    const postId = req.params.post_id
    try {
      const post = await PostModel.findById(postId)

      if (!post) {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: POST_NOT_FOUND_MESSAGE })
      }

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json({ msg: httpStatusMessages[HTTP_STATUS_CODE.UNAUTHORIZED] })
      }

      await PostModel.findByIdAndDelete(postId)

      return res.json({ msg: 'Post removed' })
    } catch (err) {
      console.error(err.message)

      if (err.kind === HTTP_ERROR_KIND.OBJECT_ID) {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: POST_NOT_FOUND_MESSAGE })
      }

      return res.status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
        .send(httpStatusMessages[HTTP_STATUS_CODE.SERVICE_UNAVAILABLE])
    }
  }

  static async getAll(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const posts = await PostModel.find().sort({ date: -1 })
      return res.json(posts)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async getSingular(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const post = await PostModel.findById(req.params.post_id)

      if (!post) {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: POST_NOT_FOUND_MESSAGE })
      }

      return res.json(post)
    } catch (err) {
      console.error(err.message)

      if (err.kind === HTTP_ERROR_KIND.OBJECT_ID) {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: POST_NOT_FOUND_MESSAGE })
      }

      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }

  static async like(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const post = await PostModel.findById(req.params.post_id)

      // check if the post has already been liked by user
      const isPostLiked =
        post.likes.filter(like => like.user.toString() === req.user.id).length > 0
      if (isPostLiked) return res.status(HTTP_STATUS_CODE.BAD_REQUEST)
        .json({ msg: POST_ALREADY_LIKED_MESSAGE })

      post.likes.unshift({ user: req.user.id })
      await post.save()
      return res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
        .send(httpStatusMessages[HTTP_STATUS_CODE.SERVICE_UNAVAILABLE])
    }
  }

  static async unlike(
    req: AuthenticatedUserRequest,
    res: Response
  ) {
    try {
      const post = await PostModel.findById(req.params.post_id)

      // check if the post has already been liked by user
      const isPostNotLiked =
        post.likes.filter(like => like.user.toString() === req.user.id).length ===
        0
      if (isPostNotLiked)
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ msg: POST_NOT_ALREADY_LIKED_MESSAGE })

      // get remove index
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id)

      post.likes.splice(removeIndex, 1)
      await post.save()

      return res.json(post.likes)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
        .send(httpStatusMessages[HTTP_STATUS_CODE.SERVICE_UNAVAILABLE])
    }
  }
}