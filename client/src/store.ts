import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import { AlertState, getDefaultAlertState } from "./reducers/alert";

export interface AppState {
  alert: AlertState
}

const initialState = {
  alert: getDefaultAlertState()
}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
