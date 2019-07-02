import uuid from 'uuid'
import { Dispatch } from 'redux'

import { IAlert } from '../interfaces/alert'

export interface AlertAction {
  type: string
  payload: IAlert | string
}

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

export const setAlert = (message: string, type: string, timeout = 5000) => (
  dispatch: Dispatch<AlertAction>
): void => {
  const id: string = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload: { message, type, id } as IAlert
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}
