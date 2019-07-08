import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { AlertState, initialAlertState } from './reducers/alert'
import { AuthState, initialAuthState } from './reducers/auth'
import { ProfileState, initialProfileState } from './reducers/profile'

export interface AppState {
  alert: AlertState
  auth: AuthState
  profile: ProfileState
}

const initialState: AppState = {
  alert: initialAlertState,
  auth: initialAuthState,
  profile: initialProfileState
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
