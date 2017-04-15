import { combineReducers } from 'redux'
import locationReducer from './location'
import homeReducer from '../routes/Home/modules/home';
import newsPostsReducer from '../routes/News/Home/modules/news';
import newsPostReducer from '../routes/News/Post/modules/news';
import { reducer as formReducer } from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    user: homeReducer,
    newsPosts: newsPostsReducer,
    newsPost: newsPostReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
