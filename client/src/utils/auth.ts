import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import store, { AppState } from '../store'
import { authSuccess } from '../actions/auth'
import { getCurrentProfile } from '../actions/profile'

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export const loadUser = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  ;(store.dispatch as ThunkDispatch<AppState, void, AnyAction>)(authSuccess())
  ;(store.dispatch as ThunkDispatch<AppState, void, AnyAction>)(
    getCurrentProfile()
  )
}
