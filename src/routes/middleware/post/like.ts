import { Response } from 'express'
import { AuthenticatedUserRequest } from '../../../interfaces/request'
import PostModel from '../../../models/Post'

export const likePostMiddleware = async (req: AuthenticatedUserRequest, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.post_id)

    // check if the post has already been liked by user
    const isPostLiked = post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    if (isPostLiked) return res.status(400).json({ msg: 'Post already liked' })

    post.likes.unshift({ user: req.user.id })
    await post.save()
    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    return res.status(503).send('Server Error')
  }
}

export const unlikePostMiddleware = async (req: AuthenticatedUserRequest, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.post_id)

    // check if the post has already been liked by user
    const isPostNotLiked = post.likes.filter(like => like.user.toString() === req.user.id).length === 0
    if (isPostNotLiked) return res.status(400).json({ msg: 'Post has not yet been liked' })

    // get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeIndex, 1)
    await post.save()

    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    return res.status(503).send('Server Error')
  }
}

