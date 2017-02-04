import {
  API_ROOT,
  AUTH
} from '../../../constants'
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS'
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

function success(data){
  return {
    type: USER_AUTH_SUCCESS,
    payload: {
      isAuth: true
    }
  }
}

function error(){
  return {
    type: USER_AUTH_ERROR,
    payload: {
      isAuth: false
    }
  }
}

export const userAuth = (postId) => {
  return (dispatch, getState) => {
    const userObj = () => {
      if (getState().form.LOGIN_FORM &&
          getState().form.LOGIN_FORM.values) {
        return JSON.stringify(getState().form.LOGIN_FORM.values)
      } else {
        return null;
      }
    }
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    return new Promise((resolve) => {
      fetch(API_ROOT + AUTH, {
        method: 'POST',
        headers: postHeaders,
        body: userObj()
      })
        .then(res => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem('token', data.token)
            dispatch(success())
            resolve()
          } else if (err) {
            localStorage.removeItem('token')
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
