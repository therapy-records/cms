// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import DashboardRoute from './Dashboard'
import NewsHomeRoute from './News/Home'
import ErrorComponent from '../components/Error/Error'
import ArticleCreateRoute from './News/ArticleCreate'
import ArticleRoute from './News/Article'
import ArticleEditRoute from './News/ArticleEdit'
import PressRoute from './Press';
import { routeAuthCheck } from '../actions/auth';
export const createRoutes = (store) => {
  return ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home(store),
    childRoutes : [
      {
        onEnter: routeAuthCheck(store),
        childRoutes:[
          DashboardRoute(store),
          NewsHomeRoute(store),
          ArticleCreateRoute(store),
          ArticleRoute(store),
          ArticleEditRoute(store),
          PressRoute(store)
        ]
      },
      {
        childRoutes: [
          // LoginRoute(store),
          // SignupRoute(store),
          CounterRoute(store)
        ]
      },
      {
        path: '*',
        component: ErrorComponent,
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
