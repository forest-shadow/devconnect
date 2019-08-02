import { BaseAction } from '../interfaces/action'
import {
  POSTS_GET,
  POSTS_ERROR,
  POST_LIKE_UPDATE, POST_DELETE
} from '../actions/types'
import { IPost } from '../interfaces/post'

export interface PostState {
  posts: IPost[]
  post: IPost | null
  loading: boolean
  error: any
}

export const initialPostState: PostState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default function(state = initialPostState, action: BaseAction) {
  const { type, payload } = action

  switch (type) {
    case POSTS_GET:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case POST_LIKE_UPDATE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      }
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    default:
      return state
  }
}
