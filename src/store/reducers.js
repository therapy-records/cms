import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './location';
import uiStateReducer from '../reducers/uiState';
import userReducer from '../reducers/user';
import newsReducer from '../reducers/news';
import selectedNewsPostReducer from '../reducers/newsPost';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    uiState: uiStateReducer,
    form: formReducer,
    user: userReducer,
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
