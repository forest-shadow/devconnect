import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import API from '../constants/api'
import { setAlert } from './alert'
import { AppState } from '../store'
import { ThunkResult } from '../interfaces/action'
import { setAuthToken } from '../utils/auth'
import { getCurrentProfile, PROFILE_CLEAR } from './profile'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'

export const authSuccess = () => async (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get(API.USER.AUTH)

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: AUTH_FAIL
    })
  }
}

export const register = ({
  name,
  email,
  password
}: {
  [index: string]: string
}): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post(API.USER.REGISTER, body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(authSuccess())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: { msg: string }) => {
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const login = (
  email: string,
  password: string
): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post(API.USER.LOGIN, body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(authSuccess())
    dispatch(getCurrentProfile())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error: { msg: string }) => {
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout: ThunkResult<void> = () => (
  dispatch: ThunkDispatch<AppState, undefined, AnyAction>
) => {
  dispatch({ type: PROFILE_CLEAR })
  dispatch({ type: LOGOUT })
}
