import axios from 'axios';
import {
  API_ROOT,
  AUTH_LOGIN
} from '../constants/index'
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR,
  ERROR_ALERT_MESSAGE
} from '../constants/actions'
import { promiseLoading } from './uiState';
import { errorAlert } from './errorAlert';

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

export function authError(err) {
  return {
    type: USER_AUTH_ERROR,
    payload: {
      isAuth: false
    }
  }
}

export const userLogin = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const userObj = () => {
      if (getState().form &&
          getState().form.LOGIN_FORM &&
          getState().form.LOGIN_FORM.values) {
        return JSON.stringify(getState().form.LOGIN_FORM.values)
      } else {
        return null;
      }
    }

    const token = localStorage.getItem('token');
    const _axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return _axios.post(
      API_ROOT + AUTH_LOGIN,
      userObj()
    ).then((data) => {
      if (data && data.data.success === true) {
        localStorage.setItem('token', data.data.token);
        dispatch(promiseLoading(false));
        return dispatch(authSuccess())
      } else {
        localStorage.removeItem('token');
        dispatch(promiseLoading(false));
        return dispatch(errorAlert(data.data.message));
      }
    }).catch((error) => {
      if (error.response) {
        dispatch(promiseLoading(false));
        dispatch(errorAlert(error.response.data.message))
      } else if (error.request) {
        dispatch(promiseLoading(false));
        dispatch(errorAlert(ERROR_ALERT_MESSAGE));
      }
    });
  }
}

export const userLogout = () => {
  return (dispatch, getState) =>
    new Promise((resolve) => {
      localStorage.removeItem('token');
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
  [USER_AUTH_SUCCESS]: (state, action) => state = action.payload,
  [USER_AUTH_ERROR]: (state, action) => state = action.payload
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isAuth: null
};
export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
