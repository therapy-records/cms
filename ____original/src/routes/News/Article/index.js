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
      const NewsArticle = require('./containers/ArticleContainer').default
      const reducer = require('../../../reducers/newsArticle').default

      /*  Add the reducer to the store on key 'selectedNewsArticle'  */
      injectReducer(store, { key: 'selectedNewsArticle', reducer })

      /*  Return getComponent   */
      cb(null, NewsArticle)

    /* Webpack named bundle   */
    }, 'article')
  }
})
