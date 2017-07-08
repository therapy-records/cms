import axios from 'axios';
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

export function authSuccess(data) {
  return {
    type: USER_AUTH_SUCCESS,
    payload: {
      isAuth: true
    }
  }
}

export function authError() {
  return {
    type: USER_AUTH_ERROR,
    payload: {
      isAuth: false
    }
  }
}

const axiosUserLogin = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
});

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
    return axiosUserLogin.post(
      API_ROOT + AUTH_LOGIN,
      userObj()
    ).then((data) => {
      if (data.data.success === true) {
        localStorage.setItem('token', data.data.token)
        dispatch(authSuccess())
      } else {
        localStorage.removeItem('token')
        dispatch(authError())
      }
    });
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
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [USER_AUTH_SUCCESS] : (state, action) => state = action.payload,
  [USER_AUTH_ERROR] : (state, action) => state = action.payload
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
