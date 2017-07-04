import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'news/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const NewsPost = require('./containers/ArticleContainer').default
      const reducer = require('./modules/article').default

      /*  Add the reducer to the store on key 'selectedNewsPost'  */
      injectReducer(store, { key: 'selectedNewsPost', reducer })

      /*  Return getComponent   */
      cb(null, NewsPost)

    /* Webpack named bundle   */
    }, 'article')
  }
})
