import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { POSTS_GET, POSTS_ERROR } from './types'
import API from '../constants/api'
import { ThunkResult } from '../interfaces/action'
import { AppState } from '../store'

export const getPosts = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.get(API.POSTS.BASE)

    dispatch({
      type: POSTS_GET,
      payload: res.data
    })
  } catch (err) {
    console.error(err.message)
    const { statusText, status } = err.response
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}
