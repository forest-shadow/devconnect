import uuid from 'uuid'
import { Dispatch } from 'redux'

import { Alert } from '../interfaces/alert'

export interface AlertAction {
  type: string
  payload: Alert|string
}

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

export const setAlert = (message: string, type: string) => (
  dispatch: Dispatch<AlertAction>
): void => {
  const id: string = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload: { message, type, id } as Alert
  })
}
