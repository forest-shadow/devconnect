import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { AlertState, initialAlertState } from './reducers/alert'
import { AuthState, initialAuthState } from './reducers/auth'
import { ProfileState, initialProfileState } from './reducers/profile'
import { PostState, initialPostState } from "./reducers/post";

export interface AppState {
  alert: AlertState
  auth: AuthState
  profile: ProfileState
  post: PostState
}

const initialState: AppState = {
  alert: initialAlertState,
  auth: initialAuthState,
  profile: initialProfileState,
  post: initialPostState
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
