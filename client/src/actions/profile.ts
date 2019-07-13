import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { History } from 'history'

import API from '../constants/api'
import ROUTES from '../constants/routes'
import { PROFILE_GET, PROFILE_ERROR } from './types'
import { ThunkResult } from '../interfaces/action'
import { AppState } from '../store'
import { ProfileCreateForm } from '../components/profile/ProfileCreate'
import { setAlert } from './alert'

export const getCurrentProfile = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
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

// create or update profile
export const createProfile = (
  formData: ProfileCreateForm,
  history: History,
  edit = false
): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post(API.PROFILE.BASE, formData, config)

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if (!edit) {
      history.push(ROUTES.DASHBOARD)
    }
  } catch (err) {
    const {
      statusText,
      status,
      data: { errors }
    } = err.response

    if (errors) {
      errors.forEach((error: { msg: string }) => {
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}
