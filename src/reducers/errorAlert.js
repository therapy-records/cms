import {
  ERROR_ALERT
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


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ERROR_ALERT]: (state, action) => {
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
