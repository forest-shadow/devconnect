import { check, validationResult } from 'express-validator'
import { AuthenticatedUserRequest } from '../types/Request.types'
import { Response } from 'express'
import UserModel from '../models/User'
import PostModel from '../models/Post'
import { HTTP_STATUS_CODE } from '../types/HTTP.types'
import { httpStatusMessages } from '../constants/http'

const COMMENT_NOT_EXIST_MESSAGE = 'Comment does not exist'
export const createCommentValidators = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]

export class PostCommentController {
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
      const post = await PostModel.findById(req.params.post_id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment)

      await post.save()
      return res.json(post.comments)
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
    try {
      const post = await PostModel.findById(req.params.post_id)

      // pull out comment
      const comment = post.comments.find(
        comment => comment.id === req.params.comment_id
      )

      // make sure comment exists
      if (!comment) {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: COMMENT_NOT_EXIST_MESSAGE })
      }

      // check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED)
          .json({ msg: httpStatusMessages[HTTP_STATUS_CODE.UNAUTHORIZED] })
      }

      // get remove index
      const removeIndex = post.comments
        .map(comment => comment.user.toString())
        .indexOf(req.user.id)

      post.comments.splice(removeIndex, 1)
      await post.save()
      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(httpStatusMessages[HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR])
    }
  }
}