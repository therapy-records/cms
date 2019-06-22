import {
  ERROR_ALERT,
  RESET_ERROR_ALERT
} from '../constants/actions'

// ------------------------------------
// Actions
// ------------------------------------

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


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ERROR_ALERT]: (state, action) => {
    return { ...state, message: action.payload }
  },
  [RESET_ERROR_ALERT]: (state, action) => {
    return { ...state, message: action.payload }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  message: ''
};

export default function errorAlertReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
