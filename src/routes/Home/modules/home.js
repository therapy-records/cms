import {
  API_ROOT,
  AUTH_LOGIN
} from '../../../constants'
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR 
} from '../../../constants/actions'

// ------------------------------------
// Actions
// ------------------------------------

export function authSuccess(data){
  return {
    type: USER_AUTH_SUCCESS,
    payload: {
      isAuth: true
    }
  }
}

export function authError(){
  return {
    type: USER_AUTH_ERROR,
    payload: {
      isAuth: false
    }
  }
}

export const userLogin = () => {
  return (dispatch, getState) => {
    const userObj = () => {
      if (getState().form &&
          getState().form.LOGIN_FORM &&
          getState().form.LOGIN_FORM.values) {
        return JSON.stringify(getState().form.LOGIN_FORM.values)
      } else {
        return null;
      }
    }
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    return new Promise((resolve) => {
      fetch(API_ROOT + AUTH_LOGIN, {
        method: 'POST',
        headers: postHeaders,
        body: userObj()
      })
        .then(res => res.json())
        .then((data) => {

          if (data.success === true) {
            localStorage.setItem('token', data.token)
            dispatch(authSuccess())
            resolve()
          } else {
            localStorage.removeItem('token')
            dispatch(authError())
            resolve()
          }
        }
      );
    })
  }
}

export const userLogout = () => {
  return (dispatch, getState) =>
    new Promise((resolve) => {
      localStorage.removeItem('token')
      dispatch(authError());
      resolve();
    })
}

export const actions = {
  userLogin,
  userLogout
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
