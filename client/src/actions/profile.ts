import axios from 'axios'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { History } from 'history'

import API from '../constants/api'
import ROUTES from '../constants/routes'
import { axiosConfig } from '../constants/config'
import {
  PROFILE_GET,
  PROFILE_ERROR,
  PROFILE_UPDATE,
  PROFILES_GET,
  PROFILE_CLEAR,
  PROFILE_REPOS_GET
} from './types'
import { setAlert } from './alert'
import { ThunkResult } from '../interfaces/action'
import { AppState } from '../store'
import { ProfileCreateForm } from '../components/dashboard/ProfileCreate'
import { AddExperienceForm } from '../components/dashboard/AddExperience'
import { AddEducationForm } from '../components/dashboard/AddEducation'

const handlerErrorResponse = (
  error: any,
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  const {
    statusText,
    status,
    data: { errors }
  } = error.response

  if (errors) {
    errors.forEach((error: { msg: string }) => {
      dispatch(setAlert(error.msg, 'danger'))
    })
  }

  dispatch({
    type: PROFILE_ERROR,
    payload: { msg: statusText, status: status }
  })
}

export const getCurrentProfile = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.get(API.PROFILE.CURRENT)

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const getProfiles = (): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  dispatch({ type: PROFILE_CLEAR })
  try {
    const res = await axios.get(API.PROFILE.BASE)

    dispatch({
      type: PROFILES_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const getProfileById = (userId: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  dispatch({ type: PROFILE_CLEAR })
  try {
    const res = await axios.get(API.PROFILE.GET(userId))

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const getProfileRepos = (username: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  dispatch({ type: PROFILE_CLEAR })
  try {
    const res = await axios.get(API.PROFILE.GET_REPOS(username))

    dispatch({
      type: PROFILE_REPOS_GET,
      payload: res.data
    })
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

// create or update profile
export const createProfile = (
  formData: ProfileCreateForm,
  history: History,
  edit = false
): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.post(API.PROFILE.BASE, formData, axiosConfig)

    dispatch({
      type: PROFILE_GET,
      payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    if (!edit) {
      history.push(ROUTES.DASHBOARD)
    }
  } catch (err) {
    handlerErrorResponse(err, dispatch)
  }
}

export const addExperience = (
  formData: AddExperienceForm,
  history: History
): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.put(
      API.PROFILE.EXPERIENCE.BASE,
      formData,
      axiosConfig
    )

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push(ROUTES.DASHBOARD)
  } catch (err) {
    handlerErrorResponse(err, dispatch)
  }
}

export const addEducation = (
  formData: AddEducationForm,
  history: History
): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.put(
      API.PROFILE.EDUCATION.BASE,
      formData,
      axiosConfig
    )

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push(ROUTES.DASHBOARD)
  } catch (err) {
    handlerErrorResponse(err, dispatch)
  }
}

export const deleteExperience = (id: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.delete(API.PROFILE.EXPERIENCE.DELETE(id))

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Experience Removed', 'success'))
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}

export const deleteEducation = (id: string): ThunkResult<void> => async (
  dispatch: ThunkDispatch<AppState, void, AnyAction>
) => {
  try {
    const res = await axios.delete(API.PROFILE.EDUCATION.DELETE(id))

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (err) {
    const { statusText, status } = err.response
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: statusText, status: status }
    })
  }
}
