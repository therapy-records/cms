import {
  GENERIC_ERROR
} from '../constants/actions'

// ------------------------------------
// Actions
// ------------------------------------

export const genericError = str => {
  return {
    type: GENERIC_ERROR,
    payload: str || ''
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GENERIC_ERROR]: (state, action) => {
    return { ...state, message: action.payload }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  message: ''
};

export default function genericErrorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
