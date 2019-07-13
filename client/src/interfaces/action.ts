import { ThunkAction } from 'redux-thunk'
import { AppState } from '../store'
import { AnyAction } from 'redux'

export interface BaseAction {
  type: string
  payload?: any
}

export type ThunkResult<R> = ThunkAction<R, AppState, void, AnyAction>
