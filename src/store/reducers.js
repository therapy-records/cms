import { combineReducers } from 'redux'
import locationReducer from './location'
import homeReducer from '../routes/Home/modules/home';
import { reducer as formReducer } from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    user: homeReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
