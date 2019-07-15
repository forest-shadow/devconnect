import { IProfile } from '../interfaces/profile'
import { BaseAction } from '../interfaces/action'
import {
  PROFILE_GET,
  PROFILE_ERROR,
  PROFILE_CLEAR,
  PROFILE_UPDATE
} from '../actions/types'

export interface ProfileState {
  profile: IProfile | null
  profiles: IProfile[]
  repos: any
  loading: boolean
  error: any
}

export const initialProfileState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default function(state = initialProfileState, action: BaseAction) {
  const { type, payload } = action

  switch (type) {
    case PROFILE_GET:
    case PROFILE_UPDATE:
      return {
        ...state,
        profile: payload as IProfile,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    default:
      return state
  }
}
