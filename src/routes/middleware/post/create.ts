import { Response } from 'express'
import { check, validationResult } from 'express-validator'

import PostModel from '../../../models/Post'
import UserModel from '../../../models/User'
import { AuthenticatedUserRequest } from '../../../interfaces/request'

export const createPostValidators = [
  check('text', 'Text is required')
    .not()
    .isEmpty()
]

export const createPostMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
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
    return res.status(500).send('Server Error')
  }
}
