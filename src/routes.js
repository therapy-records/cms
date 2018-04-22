import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Press from './routes/Press';
import NewsHome from './routes/News/Home';
import NewsArticle from './routes/News/Article';
import NewsArticleEdit from './routes/News/ArticleEdit';
import NewsArticleCreate from './routes/News/ArticleCreate';

import './index.css';

const TestComponent = () => {
  return (
    <div>
    test component
    </div>
  )
};

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <p>header here</p>

          <div className="main-container">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/test" component={TestComponent} exact />
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/press" component={Press} exact />

              <Route path="/news" component={NewsHome} exact />
              <Route path="/news/:id" component={NewsArticle} exact />
              <Route path="/news/:id/edit" component={NewsArticleEdit} exact />
              <Route path="/news/create" component={NewsArticleCreate} exact />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

// const mapStateToProps = (state) => ({
//   isAuth: state.user.isAuth,
//   showSubscriptionModal: state.uiState.subscriptionModal.show
// })

const ConnectedRouter = connect(
  null,
  null
)(Router);

const Routes = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter />
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;

