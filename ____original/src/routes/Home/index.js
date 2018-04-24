/*
import HomeView from './components/HomeView'

// Sync route definition
export default {
  component : HomeView
}
*/

import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Home = require('./containers/HomeContainer').default
      const reducer = require('../../reducers/user').default

      /*  Add the reducer to the store on key 'user'  */
      injectReducer(store, { key: 'user', reducer })

      /*  Return getComponent   */
      cb(null, Home)

    /* Webpack named bundle   */
    }, 'home')
  }
})