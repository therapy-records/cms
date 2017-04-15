// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import DashboardRoute from './Dashboard'
import NewsHomeRoute from './News/Home'
import NewsCreateRoute from './News/Create'
import NewsPostSingleRoute from './News/Post'
import NewsPostEditSingleRoute from './News/PostEdit'
import {
  authSuccess,
  authError
} from './Home/modules/home'
import {
  API_ROOT,
  AUTH
} from '../constants'

export const createRoutes = (store) => {

  const requireLogin = (store, nextState, replace, cb) => {
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

  return ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home(store),
    childRoutes : [
      {
        onEnter: requireLogin(store),
        childRoutes:[
          DashboardRoute(store),
          NewsHomeRoute(store),
          NewsCreateRoute(store),
          NewsPostSingleRoute(store),
          NewsPostEditSingleRoute(store)
        ]
      },
      {
        childRoutes: [
          // LoginRoute(store),
          // SignupRoute(store),
          CounterRoute(store),
        ]
      },
      {
        path: '*',
        indexRoute: '/',
        status: 404
      }
    ]
  });
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
