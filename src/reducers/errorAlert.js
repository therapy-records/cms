import {
  ERROR_ALERT,
  RESET_ERROR_ALERT
} from '../constants/actions'

const ACTION_HANDLERS = {
  [ERROR_ALERT]: (state, action) => {
    return { ...state, message: action.payload }
  },
  [RESET_ERROR_ALERT]: (state, action) => {
    return { ...state, message: '' }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const INITIAL_STATE = {
  message: ''
};

export default function errorAlertReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
