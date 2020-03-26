import axios from 'axios';
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
    const _axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || ''
      }
    });

    if (!token || token === 'undefined') {
      dispatch(authError());

      return _axios.post(API_ROOT + AUTH)
        .then((data) => {
          if (data.data.success === true) {
            localStorage.setItem('token', data.data.token);
            return dispatch(authSuccess());
          }
          localStorage.removeItem('token');
          return dispatch(authError());
        }).catch(catchErr => {
          localStorage.removeItem('token');
          return dispatch(authError());
        });
    } else {
      return _axios.post(API_ROOT + AUTH)
        .then((data) => {
          if (data.data.success === true) {
            return dispatch(authSuccess());
          }
          localStorage.removeItem('token');
          return dispatch(authError());
        }).catch(() =>
          dispatch(authError())
        );
    }
  }
}
