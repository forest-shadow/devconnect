import { Response } from 'express'

import { AuthenticatedUserRequest } from '../../../interfaces/request'
import PostModel from '../../../models/Post'

export const deletePostMiddleware = async (req: AuthenticatedUserRequest, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.post_id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorizing' })
    }

    await post.remove()

    return res.json({ msg: 'Post removed' })
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }

    return res.status(503).send('Server Error')
  }
}
