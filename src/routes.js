import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';
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

export const NotFound = () => <div className='container'><p>Page not found :(</p></div>;

export class Router extends Component {
  render() {
    const { isAuth, onAuthCheck } = this.props;

    return (
      <BrowserRouter>
        <div>

        <div className="main-container">

            <div className='col-first'>
              <Sidebar />
            </div>

            <div className='col-last'>
              <Switch>

                <Route
                  path="/"
                  component={Home}
                  exact
                />

                <ProtectedRoute
                  path="/dashboard"
                  component={Dashboard}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />
                <ProtectedRoute
                  path="/press"
                  component={Press}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/news"
                  component={NewsHome}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/news/create"
                  component={NewsArticleCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/news/:id"
                  component={NewsArticle}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/news/:id/edit"
                  component={NewsArticleEdit}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/other-work"
                  component={OtherWorkHome}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/other-work/create"
                  component={OtherWorkArticleCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/other-work/:id"
                  component={OtherWorkArticle}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/other-work/:id/edit"
                  component={OtherWorkArticleEdit}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <Route
                  path="/"
                  component={NotFound}
                />

              </Switch>
            </div>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

const mapDispatchToProps = {
  onAuthCheck: () => authCheck()
};

export const ConnectedRouter = connect(
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
