import { SET_ALERT, REMOVE_ALERT, AlertAction } from '../actions/alert'
import { Alert } from '../interfaces/alert'

declare type AlertState = []|[Alert]

export default function(state: AlertState = [], action: AlertAction) {
  const { type, payload } = action
  switch (type) {
    case SET_ALERT:
      return [...state, payload as Alert]
    case REMOVE_ALERT:
      return state.filter((alert: Alert) => alert.id !== payload as string)
    default:
      return state
  }
}
