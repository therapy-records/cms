import {
  authSuccess,
  authError
} from '../routes/Home/modules/home'
import {
  API_ROOT,
  AUTH,
  AUTH_LOGIN
} from '../constants'

export const authCheck = () => {
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


export const routeAuthCheck = (store, nextState, replace, cb) => {
  return (nextState, replace, cb) => {
    const token = localStorage.getItem('token');
    const { user } = store.getState();

    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
      fetch(API_ROOT + AUTH, {
        method: 'POST',
        headers: postHeaders
      })
        .then(res => res.json())
        .then((data) => {
          if (data.success === true) {
            if (nextState.location.pathname === '/') {
              replace('/dashboard');
            }
            store.dispatch(authSuccess());
            resolve();
            cb();
          } else {
            postHeaders.set('Authorization', localStorage.removeItem('token'));
            store.dispatch(authError())
            replace('/');
            cb();
          }
        }
      );
    })
  };
  cb();
}

