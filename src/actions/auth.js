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
    const token = localStorage.getItem('token'); // eslint-disable-line no-undef
    if (!token || token === 'undefined') {
      dispatch(authError());
      return _axiosAuthHeaders.post(API_ROOT + AUTH)
        .then((data) => {
          if (data.data.success === true) {
            localStorage.setItem('token', data.data.token); // eslint-disable-line no-undef
            return dispatch(authSuccess());
          } else {
            localStorage.removeItem('token'); // eslint-disable-line no-undef
            return dispatch(authError());
          }
        }, () => {
          localStorage.removeItem('token'); // eslint-disable-line no-undef
          return dispatch(authError());
        });
    } else {
      return _axiosAuthHeaders.post(API_ROOT + AUTH)
        .then((data) => {
          if (data.data.success === true) {
            return dispatch(authSuccess());
          } else {
            localStorage.removeItem('token'); // eslint-disable-line no-undef
            return dispatch(authError());
          }
        }, () => {
          localStorage.removeItem('token'); // eslint-disable-line no-undef
          return dispatch(authError());
        });
    }
  }
}
