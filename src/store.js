import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import reducers from './reducers';
import rootEpic from './epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const epicMiddleware = createEpicMiddleware(
  rootEpic
);

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    thunk,
    epicMiddleware
  ))
);

export default store;
