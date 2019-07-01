import { User } from './user'
import { Schema } from 'mongoose'

export interface Post {
  user: PostUser
  text: string
  name: string
  avatar: string
  likes: [PostLike]
  comments: [PostComment]
  date: Date
}

interface PostLike {
  user: PostUser
}

interface PostComment {
  id?: string
  user: PostUser
  text: string
  name: string
  avatar: string
  date?: Date
}

declare type PostUser = string|User|Schema.Types.ObjectId