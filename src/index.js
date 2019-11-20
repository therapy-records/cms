import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Routes from './routes';
import store from './store';
import { GRAPHQL_ROOT } from './constants';

const DOM_ROOT_ID = 'root';
const DOM_ROOT = document.getElementById(DOM_ROOT_ID);

const client = new ApolloClient({
  uri: GRAPHQL_ROOT
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes store={store} history={createBrowserHistory()} />
  </ApolloProvider>,
  DOM_ROOT
);
