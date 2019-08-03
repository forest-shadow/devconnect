import { check, validationResult } from 'express-validator/check'
import { AuthenticatedUserRequest } from '../../../interfaces/request'
import { Response } from 'express'
import UserModel from '../../../models/User'
import PostModel from '../../../models/Post'

export const createCommentValidators = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]

export const createCommentMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
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
    return res.status(500).send('Server Error')
  }
}

export const deleteCommentMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    const post = await PostModel.findById(req.params.post_id)

    // pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    )

    // make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }

    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
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
    return res.status(500).send('Server Error')
  }
}
