import { Response } from 'express'

import { AuthenticatedUserRequest } from '../../../interfaces/request'
import PostModel from '../../../models/Post'
import { HTTP_STATUS_CODE } from '../../../types/HTTP.types'
import { httpStatusMessages } from '../../../constants/http'
import { POST_NOT_FOUND_MESSAGE } from './Post.constants'

export const deletePostMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
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

    if (err.kind === 'ObjectId') {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ msg: POST_NOT_FOUND_MESSAGE })
    }

    return res.status(HTTP_STATUS_CODE.SERVICE_UNAVAILABLE)
      .send(httpStatusMessages[HTTP_STATUS_CODE.SERVICE_UNAVAILABLE])
  }
}
