import { SET_ALERT, REMOVE_ALERT, AlertAction } from '../actions/alert'
import { IAlert } from '../interfaces/alert'

export declare type AlertState = IAlert[]

export const getDefaultAlertState = () => ([])

export default function(state: AlertState = getDefaultAlertState(), action: AlertAction) {
  const { type, payload } = action
  switch (type) {
    case SET_ALERT:
      return [...state, payload as IAlert]
    case REMOVE_ALERT:
      return state.filter((alert: IAlert) => alert.id !== payload as string)
    default:
      return state
  }
}
