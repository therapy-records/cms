import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import StickyAuthError from './components/StickyAuthError';
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
import PressHome from './routes/Press/Home';
import PressCreate from './routes/Press/Create';
import PressView from './routes/Press/View';
import PressEdit from './routes/Press/Edit';
import CollaboratorsHome from './routes/Collaborators/Home';
import CollaboratorsCreate from './routes/Collaborators/Create';
import CollaboratorView from './routes/Collaborators/View';
import CollaboratorEdit from './routes/Collaborators/Edit';
import Gigs from './routes/Gigs';
import GigCreate from './routes/Gigs/Create'
import GigsView from './routes/Gigs/View';
import GigEdit from './routes/Gigs/Edit';
import Videos from './routes/Videos/Home';
import Gallery from './routes/Gallery/Home';
import Analytics from './routes/Analytics/Home';
import { authCheck } from './actions/auth';
import './index.css';

export const NotFound = () => <div className='container'><h2>Page not found :(</h2></div>;

export class Router extends Component {
  render() {
    const { isAuth, onAuthCheck } = this.props;

    return (
      <BrowserRouter>
        <div>

          <StickyAuthError />

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
                  component={PressHome}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/press/create"
                  component={PressCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/press/:id"
                  component={PressView}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/press/:id/edit"
                  component={PressEdit}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/collaborators"
                  component={CollaboratorsHome}
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
                  path="/collaborators"
                  component={CollaboratorsHome}
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
                  path="/gigs/create"
                  component={GigCreate}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/gigs/:id"
                  component={GigsView}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/gigs/:id/edit"
                  component={GigEdit}
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

                <ProtectedRoute
                  path="/gallery"
                  component={Gallery}
                  isAuth={isAuth}
                  onAuthCheck={onAuthCheck}
                  exact
                />

                <ProtectedRoute
                  path="/analytics"
                  component={Analytics}
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
