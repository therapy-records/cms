// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import DashboardRoute from './Dashboard'
import NewsHomeRoute from './News/Home'
import NewsCreateRoute from './News/Create'
import NewsPostSingleRoute from './News/Post'
import { userAuth } from './Home/modules/home'
import {
  USER_AUTH_SUCCESS,
  USER_AUTH_ERROR 
} from '../constants/actions'

export const createRoutes = (store) => {

  const requireLogin = (nextState, replace, cb) => {
    return (nextState, replace, cb) => {
      const token = localStorage.getItem('token');
      const { user } = store.getState();
      // todo: if tokenIsValid (do api check)
      if (!token) {
        replace('/');
        store.dispatch({
          type: USER_AUTH_ERROR,
          payload: {
            isAuth: false
          }
        });
      } else {
        store.dispatch({
          type: USER_AUTH_SUCCESS,
          payload: {
            isAuth: true
          }
        });
        if (nextState.location.pathname === '/') {
          replace('/dashboard');
        }
      }
      cb();
    };
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
          NewsPostSingleRoute(store)
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
