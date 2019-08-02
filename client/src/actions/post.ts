import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { POSTS_GET, POSTS_ERROR, POST_LIKE_UPDATE, POST_DELETE } from './types'
import API from '../constants/api'
import { ThunkResult } from '../interfaces/action'
import { AppState } from '../store'
import { setAlert } from './alert'

export const getPosts = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.get(API.POST.BASE)

    dispatch({
      type: POSTS_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const likePost = (postId: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.put(API.POST.ASSESS.LIKE(postId))

    dispatch({
      type: POST_LIKE_UPDATE,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const unlikePost = (postId: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.put(API.POST.ASSESS.UNLIKE(postId))

    dispatch({
      type: POST_LIKE_UPDATE,
      payload: { id: postId, likes: res.data }
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const deletePost = (postId: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    await axios.delete(API.POST.DELETE(postId))

    dispatch({
      type: POST_DELETE,
      payload: postId
    })

    dispatch(setAlert('Post Removed', 'success'))
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}
