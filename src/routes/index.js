// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import DashboardRoute from './Dashboard'
import NewsHomeRoute from './News/Home'
import NewsCreateRoute from './News/Create'
import NewsPostSingleRoute from './News/Post'
import NewsPostEditSingleRoute from './News/PostEdit'
import { authCheck }  from '../actions/auth';
export const createRoutes = (store) => {
  return ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home(store),
    childRoutes : [
      {
        onEnter: authCheck(store),
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
