import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'news/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const NewsPostEdit = require('./containers/NewsPostEditContainer').default
      const reducer = require('../Post/modules/news').default

      /*  Add the reducer to the store on key 'newsPost'  */
      injectReducer(store, { key: 'newsPost', reducer })

      /*  Return getComponent   */
      cb(null, NewsPostEdit)

    /* Webpack named bundle   */
    }, 'newspost')
  }
})
