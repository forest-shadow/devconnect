export interface IPost {
  _id: string
  user: string
  text: string
  name: string
  avatar: string
  likes: [PostLike]
  comments: [PostComment]
  date: string
}

interface PostLike {
  user: PostUser
}

export interface PostComment {
  _id?: string
  user: PostUser
  text: string
  name: string
  avatar: string
  date?: string
}

declare type PostUser = string