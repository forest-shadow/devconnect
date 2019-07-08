import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import API from '../constants/api'
import { ThunkResult } from '../interfaces/action'
import { AppState } from '../store'

export const PROFILE_GET = 'PROFILE_GET'
export const PROFILE_ERROR = 'PROFILE_ERROR'

export const getCurrentProfile = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>
) => {
  try {
    const res = await axios.get(API.PROFILE.CURRENT)

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}
