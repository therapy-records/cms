import {
  authSuccess,
  authError
} from '../routes/Home/modules/home'
import {
  API_ROOT,
  AUTH
} from '../constants'

export const authCheck = (store, nextState, replace, cb) => {
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
