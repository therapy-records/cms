import { combineEpics } from 'redux-observable';

/*
const LOGIN_PATHNAME = '/';

const getToken = () => localStorage.getItem('token');

const authCheckEpic = (action$, store, nextState, replace) => {
  return action$.ofType('LOCATION_CHANGE')
  .subscribe((action) => {
    if (getToken() && getToken() !== 'undefined') {
      return axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken()
        }
      }).post(API_ROOT + AUTH)
      .then((data) => {
        if (!data.data.success) {
          localStorage.removeItem('token');
          return store.dispatch(authError());
        }
      }, () => {
        return store.dispatch(authError());
      });
    } else if (action.payload.pathname !== LOGIN_PATHNAME &&
               (!getToken() || getToken() === 'undefined')) {
      return store.dispatch(authError());
    }
  });
}
*/

const rootEpic = combineEpics(
  // authCheckEpic
);

export default rootEpic;
