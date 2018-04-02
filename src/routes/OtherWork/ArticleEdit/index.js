// import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path : 'other-work/:id/edit',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const OtherWorkArticleEdit = require('./containers/ArticleEditContainer').default
      // const reducer = require('../../../reducers/otherWorkArticle').default

      /*  Add the reducer to the store on key 'selectedOtherWorkArticle'  */
      // injectReducer(store, { key: 'selectedOtherWorkArticle', reducer })

      /*  Return getComponent   */
      cb(null, OtherWorkArticleEdit)

    /* Webpack named bundle   */
    }, 'otherWorkArticleEdit')
  }
})
