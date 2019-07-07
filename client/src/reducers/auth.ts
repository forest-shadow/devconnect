import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL
} from '../actions/auth'
import { BaseAction } from '../interfaces/action'

export interface AuthState {
  [index: string]: any
  token: string | null
  isAuthenticated: boolean | null
  loading: boolean
  user: string | null
}

export const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function(
  state: AuthState = initialAuthState,
  action: BaseAction
) {
  const { type, payload } = action
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}