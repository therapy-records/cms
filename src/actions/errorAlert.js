import {
  ERROR_ALERT,
  RESET_ERROR_ALERT
} from '../constants/actions'

export const errorAlert = str => {
  return {
    type: ERROR_ALERT,
    payload: str || ''
  }
}

export const resetErrorAlert = str => {
  return {
    type: RESET_ERROR_ALERT,
    payload: ''
  }
}
