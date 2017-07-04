export default (store) => ({
  path : 'news',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const News = require('./containers/NewsContainer').default

      /*  Return getComponent   */
      cb(null, News)

    /* Webpack named bundle   */
    }, 'news')
  }
})
