// import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'other-work/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const OtherWorkArticle = require('./containers/ArticleContainer').default
      // const reducer = require('../../../reducers/otherWorkArticle').default

      /*  Add the reducer to the store on key 'selectedOtherWorkArticle'  */
      // injectReducer(store, { key: 'selectedOtherWorkArticle', reducer })

      /*  Return getComponent   */
      cb(null, OtherWorkArticle)

    /* Webpack named bundle   */
    }, 'otherWorkArticle')
  }
})
