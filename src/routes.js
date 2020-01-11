import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import StickyError from './components/StickyError/StickyError';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import NewsHome from './routes/News/Home';
import NewsArticle from './routes/News/Article';
import NewsArticleEdit from './routes/News/ArticleEdit';
import NewsArticleCreate from './routes/News/ArticleCreate';
import JournalismHome from './routes/Journalism/Home';
import JournalismArticle from './routes/Journalism/Article';
import JournalismArticleEdit from './routes/Journalism/ArticleEdit';
import JournalismArticleCreate from './routes/Journalism/ArticleCreate';
import Press from './routes/Press';
import Collaborators from './routes/Collaborators/Home';
import CollaboratorsCreate from './routes/Collaborators/Create';
import CollaboratorView from './routes/Collaborators/View';
import CollaboratorEdit from './routes/Collaborators/Edit';
import Gigs from './routes/Gigs';
import Videos from './routes/Videos';
import { authCheck } from './actions/auth';
import './index.css';

export const NotFound = () => <div className='container'><h2>Page not found :(</h2></div>;

export class Router extends Component {
  render() {
    const { isAuth, onAuthCheck } = this.props;

    return (
      <BrowserRouter>
        <div>

          <StickyError />

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
                  path="/journalism"
                  component={JournalismHome}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/journalism/create"
                  component={JournalismArticleCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/journalism/:id"
                  component={JournalismArticle}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/journalism/:id/edit"
                  component={JournalismArticleEdit}
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
                  path="/gigs"
                  component={Gigs}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/collaborators"
                  component={Collaborators}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/collaborators/create"
                  component={CollaboratorsCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/collaborators/:id"
                  component={CollaboratorView}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/collaborators/:id/edit"
                  component={CollaboratorEdit}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/videos"
                  component={Videos}
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

Router.propTypes = {
  store: PropTypes.objectOf(PropTypes.any),
  isAuth: PropTypes.bool,
  onAuthCheck: PropTypes.func.isRequired
};

export default Routes;
