import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './location';
import uiStateReducer from '../reducers/uiState';
import homeReducer from '../routes/Home/modules/home';
import newsReducer from '../reducers/news';
import selectedNewsPostReducer from '../reducers/newsPost';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    uiState: uiStateReducer,
    form: formReducer,
    user: homeReducer,
    news: newsReducer,
    selectedNewsPost: selectedNewsPostReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
