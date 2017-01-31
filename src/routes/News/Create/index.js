import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'news/create',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const News = require('./containers/NewsCreateContainer').default
      const reducer = require('./modules/newsCreate').default

      /*  Add the reducer to the store on key 'news'  */
      injectReducer(store, { key: 'newsCreate', reducer })

      /*  Return getComponent   */
      cb(null, News)

    /* Webpack named bundle   */
    }, 'newsCreate')
  }
})
