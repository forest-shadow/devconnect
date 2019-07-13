import uuid from 'uuid'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ALERT_SET, ALERT_REMOVE } from './types'
import { IAlert, AlertType } from '../interfaces/alert'
import { AppState } from '../store'
import { ThunkResult } from '../interfaces/action'

export const setAlert = (
  message: string,
  type: AlertType,
  timeout = 5000
): ThunkResult<void> => (
  dispatch: ThunkDispatch<AppState, undefined, Action<any>>
) => {
  const id: string = uuid.v4()
  dispatch({
    type: ALERT_SET,
    payload: { message, type, id } as IAlert
  })

  setTimeout(() => dispatch({ type: ALERT_REMOVE, payload: id }), timeout)
}
