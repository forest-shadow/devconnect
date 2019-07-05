import { SET_ALERT, REMOVE_ALERT } from '../actions/alert'
import { IAlert } from '../interfaces/alert'
import { BaseAction } from '../interfaces/action'

export declare type AlertState = IAlert[]

export const initialAlertState: AlertState = []

export default function(
  state: AlertState = initialAlertState,
  action: BaseAction
) {
  const { type, payload } = action
  switch (type) {
    case SET_ALERT:
      return [...state, payload as IAlert]
    case REMOVE_ALERT:
      return state.filter((alert: IAlert) => alert.id !== (payload as string))
    default:
      return state
  }
}
