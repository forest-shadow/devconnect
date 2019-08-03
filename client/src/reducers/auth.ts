import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_DELETE,
  USER_DELETE_ERROR
} from '../actions/types'
import { BaseAction } from '../interfaces/action'
import { IUser } from '../interfaces/user'

export interface AuthState {
  [index: string]: any
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  user: IUser | null
}

export const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
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
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case USER_DELETE:
      localStorage.removeItem('token')
      return {
        ...initialAuthState,
        token: null,
        loading: false
      }
    case USER_DELETE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
