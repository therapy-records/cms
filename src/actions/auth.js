import _axiosAuthHeaders from '../utils/axios'
import {
  authSuccess,
  authError
} from '../reducers/user'
import {
  API_ROOT,
  AUTH
} from '../constants'

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      dispatch(authError());
      return _axiosAuthHeaders.post(API_ROOT + AUTH)
        .then((data) => {
          if (data.data.success === true) {
            localStorage.setItem('token', data.data.token);
            dispatch(authSuccess());
          } else {
            localStorage.removeItem('token');
            dispatch(authError());
          }
        }, () => {
          localStorage.removeItem('token');
          dispatch(authError());
        });
    } else {
      dispatch(authSuccess());
    }
  }
}

export const routeAuthCheck = (store, nextState, replace, cb) => {
  return (nextState, replace, cb) => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      store.dispatch(authError());
      return _axiosAuthHeaders.post(API_ROOT + AUTH)
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
        }, () => {
          store.dispatch(authError())
          replace('/');
          cb();
        });
    } else {
      store.dispatch(authSuccess());
      cb();
    }
  }
}
