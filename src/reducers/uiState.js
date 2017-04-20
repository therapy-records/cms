export const UISTATE_PROMISE_LOADING = 'UISTATE_PROMISE_LOADING'
export const UISTATE_PROMISE_SUCCESS = 'UISTATE_PROMISE_SUCCESS'
export const UISTATE_PROMISE_ERROR = 'UISTATE_PROMISE_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

export const promiseLoading = (bool) => {
  return {
    type: UISTATE_PROMISE_LOADING,
    payload: {
      loading: bool
    }
  }
}

function promiseSuccess(){
  return {
    type: UISTATE_PROMISE_LOADING,
    payload: true
  }
}

function promiseError(err){
  return {
    type: UISTATE_PROMISE_ERROR,
    payload: err
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UISTATE_PROMISE_LOADING] : (state, action) => state.loading = action.payload,
  [UISTATE_PROMISE_SUCCESS] : (state, action) => state.success = action.payload,
  [UISTATE_PROMISE_ERROR] : (state, action) => state.error = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  success: false,
  error: false
};

export default function uiStateReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
