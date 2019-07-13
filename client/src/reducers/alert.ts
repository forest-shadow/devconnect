import { ALERT_SET, ALERT_REMOVE } from '../actions/types'
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
    case ALERT_SET:
      return [...state, payload as IAlert]
    case ALERT_REMOVE:
      return state.filter((alert: IAlert) => alert.id !== (payload as string))
    default:
      return state
  }
}
