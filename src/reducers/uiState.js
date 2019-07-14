import {
  UISTATE_PROMISE_LOADING,
  UISTATE_PROMISE_SUCCESS,
  UISTATE_PROMISE_ERROR,
  UISTATE_PROMISE_SUCCESS_RESET
} from '../constants/actions'

const ACTION_HANDLERS = {
  [UISTATE_PROMISE_LOADING]: (state, action) => {
    return { ...state, promiseLoading: action.payload }
  },
  [UISTATE_PROMISE_SUCCESS]: (state, action) => {
    return { ...state, promiseSuccess: action.payload }
  },
  [UISTATE_PROMISE_ERROR]: (state, action) => {
    return { ...state, promiseError: action.payload }
  },
  [UISTATE_PROMISE_SUCCESS_RESET]: (state, action) => {
    return { ...state, promiseSuccess: action.payload }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const INITIAL_STATE = {
  promiseLoading: false,
  promiseSuccess: false,
  promiseError: false
};

export default function uiStateReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
