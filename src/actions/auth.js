import _axiosAuthHeaders from '../utils/axios'
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

export const authCheck = () => {
  return (dispatch, getState) => {
    return _axiosAuthHeaders.get(
      API_ROOT + AUTH_LOGIN,
      getUserObj(getState())
    ).then((data) => {
      if (data.success === true) {
        localStorage.setItem('token', data.token)
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
    return _axiosAuthHeaders.post(
      API_ROOT + AUTH
    )
    // .then(res => res.json())
    .then((data) => {
      if (data.success === true) {
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
