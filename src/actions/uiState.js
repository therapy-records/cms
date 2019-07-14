import {
  UISTATE_PROMISE_LOADING,
    UISTATE_PROMISE_SUCCESS,
    UISTATE_PROMISE_ERROR,
    UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions'

export const promiseLoading = (bool) => {
  return {
    type: UISTATE_PROMISE_LOADING,
    payload: bool
  }
}

export const promiseSuccess = (bool) => {
  return {
    type: UISTATE_PROMISE_SUCCESS,
    payload: bool
  }
}

export const promiseError = () => {
  return {
    type: UISTATE_PROMISE_ERROR,
    payload: true
  }
}

export const resetPromiseState = () => {
  return {
    type: UISTATE_PROMISE_SUCCESS_RESET,
    payload: false
  }
}
