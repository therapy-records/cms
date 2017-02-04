import {
  API_ROOT
  // NEWS
} from '../../../constants'
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS'
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

function success(data){
  return {
    type: USER_AUTH_SUCCESS,
    payload: data
  }
}

//todo: why doesn't error work?
function error(){
  return {
    type: USER_AUTH_ERROR,
    payload: {error: true}
  }
}

export const userAuth = (postId) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      fetch(API_ROOT + 'auth')
        .then(res => res.json())
        .then((data) => {
          if (data) {
            dispatch(success(data))
            resolve()
          } else if (err) {
            dispatch(error())
            resolve()
          }
        }
      );
    })

  }
}

export const actions = {
  userAuth
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_AUTH_SUCCESS] : (state, action) => state = action.payload,
  [USER_AUTH_ERROR] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
