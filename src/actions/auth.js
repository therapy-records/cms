import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import _axiosAuthHeaders, { headers } from '../utils/axios'
import {
  authSuccess,
  authError
} from '../routes/Home/modules/home'
import {
  API_ROOT,
  AUTH,
  AUTH_LOGIN
} from '../constants'

const getUserObj = (state) => {
  if (state.form &&
      state.form.LOGIN_FORM &&
      state.form.LOGIN_FORM.values) {
    return JSON.stringify(state.form.LOGIN_FORM.values)
  } else {
    return null;
  }
}

const axiosAuthCheck = axios.create({
  headers: headers
});

export const authCheck = () => {
  return (dispatch, getState) => {
    return _axiosAuthHeaders.post(
      API_ROOT + AUTH_LOGIN
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

export const routeAuthCheck = (store, nextState, replace, cb) => {
  return (nextState, replace, cb) => {
    return axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).post(
      API_ROOT + AUTH,
      {},
      headers
    )
    .then((data) => {
      if (data.data.success === true) {
        if (typeof nextState === 'object' &&
            nextState.location.pathname === '/') {
          replace('/dashboard');
        }
        store.dispatch(authSuccess());
        cb();
      } else {
        localStorage.removeItem('token');
        store.dispatch(authError())
        replace('/');
        cb();
      }
    });
  }
}
