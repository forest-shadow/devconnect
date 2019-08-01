import { BaseAction } from '../interfaces/action'
import { POSTS_GET, POSTS_ERROR } from '../actions/types'

export interface PostState {
  posts: any[]
  post: any
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
    default:
      return state
  }
}
