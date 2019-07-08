import { IProfile } from '../interfaces/profile'
import { BaseAction } from '../interfaces/action'
import { PROFILE_GET, PROFILE_ERROR } from '../actions/profile'

export interface ProfileState {
  profile: IProfile | null,
  profiles: IProfile[],
  repos: [],
  loading: boolean,
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
    default:
      return state
  }
}
