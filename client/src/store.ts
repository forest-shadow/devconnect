import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { AlertState, initialAlertState } from './reducers/alert'
import { AuthState, initialAuthState } from './reducers/auth'

export interface AppState {
  alert: AlertState
  auth: AuthState
}

const initialState: AppState = {
  alert: initialAlertState,
  auth: initialAuthState
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
