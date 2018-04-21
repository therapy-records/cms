import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const DOM_ROOT_ID = 'root';
const DOM_ROOT = document.getElementById(DOM_ROOT_ID);

ReactDOM.render(
  <Routes store={store} />,
  DOM_ROOT
);

registerServiceWorker();
