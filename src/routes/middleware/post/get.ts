import { Response } from 'express'
import { AuthenticatedUserRequest } from '../../../interfaces/request'
import PostModel from '../../../models/Post'

export const getPostsMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    const posts = await PostModel.find().sort({ date: '-1' })
    return res.json(posts)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
}

export const getPostMiddleware = async (
  req: AuthenticatedUserRequest,
  res: Response
) => {
  try {
    const post = await PostModel.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    return res.json(post)
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    return res.status(500).send('Server error')
  }
}
