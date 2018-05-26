import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header.container';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Press from './routes/Press';
import NewsHome from './routes/News/Home';
import NewsArticle from './routes/News/Article';
import NewsArticleEdit from './routes/News/ArticleEdit';
import NewsArticleCreate from './routes/News/ArticleCreate';

import OtherWorkHome from './routes/OtherWork/Home';
import OtherWorkArticle from './routes/OtherWork/Article';
import OtherWorkArticleEdit from './routes/OtherWork/ArticleEdit';
import OtherWorkArticleCreate from './routes/OtherWork/ArticleCreate';
import { authCheck } from './actions/auth';
import './index.css';

const NotFound = () => <div className='container'><p>Page not found :(</p></div>;

class Router extends Component {
  render() {
    const { isAuth } = this.props;

    return (
      <BrowserRouter>
        <div>

          <Header />

          <div className="main-container">
            <Switch>

              <Route path="/" component={Home} exact />
              <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={isAuth} exact />
              <ProtectedRoute path="/press" component={Press} isAuth={isAuth} exact />

              <ProtectedRoute path="/news" component={NewsHome} isAuth={isAuth} exact />
              <ProtectedRoute path="/news/create" component={NewsArticleCreate} isAuth={isAuth} exact />
              <ProtectedRoute path="/news/:id" component={NewsArticle} isAuth={isAuth} exact />
              <ProtectedRoute path="/news/:id/edit" component={NewsArticleEdit} isAuth={isAuth} exact />

              <ProtectedRoute path="/other-work" component={OtherWorkHome} isAuth={isAuth} exact />
              <ProtectedRoute path="/other-work/create" component={OtherWorkArticleCreate} isAuth={isAuth} exact />
              <ProtectedRoute path="/other-work/:id" component={OtherWorkArticle} isAuth={isAuth} exact />
              <ProtectedRoute path="/other-work/:id/edit" component={OtherWorkArticleEdit} isAuth={isAuth} exact />

              <Route path="/" component={NotFound} />

            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
})

const mapDispatchToProps = {
  onAuthCheck: () => authCheck()
}

const ConnectedRouter = connect(
  mapStateToProps,
  mapDispatchToProps
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
