import uuid from 'uuid'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { IAlert } from '../interfaces/alert'
import { AppState } from '../store'
import { ThunkResult } from '../interfaces/action'

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

export const setAlert = (
  message: string,
  type: string,
  timeout = 5000
): ThunkResult<void> => (
  dispatch: ThunkDispatch<AppState, undefined, Action<any>>
) => {
  const id: string = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload: { message, type, id } as IAlert
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}
