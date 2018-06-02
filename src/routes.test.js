import React from 'react'

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Routes, { Router, ConnectedRouter, NotFound } from './routes';
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

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [];
const mockState = {
  user: {
    isAuth: false
  }
};
const mockDispatch = {};
const configMockStore = configureMockStore(middlewares);
const mockStore = configMockStore(mockState, mockDispatch);

describe('Router', () => {
  let wrapper,
    props = {
      isAuth: false
    };

  beforeEach(() => {
    wrapper = shallow(<Router {...props} />);
  });

  Sidebar

  it('should render <Sidebar />', () => {
    const actual = wrapper.containsMatchingElement(
      <Sidebar />
    );
    expect(actual).to.equal(true);
  });

  it('should render home route', () => {
    const actual = wrapper.containsMatchingElement(
      <Route
        path="/"
        component={Home}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render dashboard route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/dashboard"
        component={Dashboard}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render press route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/press"
        component={Press}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render news home route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/news"
        component={NewsHome}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render news create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/news/create"
        component={NewsArticleCreate}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render news article route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/news/:id"
        component={NewsArticle}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render news article edit route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/news/:id/edit"
        component={NewsArticleEdit}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render other-work home route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/other-work"
        component={OtherWorkHome}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render other-work create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/other-work/create"
        component={OtherWorkArticleCreate}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render other-work create article route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/other-work/:id"
        component={OtherWorkArticle}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render other-work article edit route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/other-work/:id/edit"
        component={OtherWorkArticleEdit}
        isAuth={props.isAuth}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render NotFound route', () => {
    const actual = wrapper.containsMatchingElement(
      <Route
        path="/"
        component={NotFound}
      />
    );
    expect(actual).to.equal(true);
  });

  describe('ConnectedRouter', () => {
    it('should have correct mapped props', () => {
      const connectedRoutes = shallow(<ConnectedRouter store={mockStore} />);
      expect(connectedRoutes.prop('isAuth')).to.eq(mockState.user.isAuth);
      expect(connectedRoutes.prop('onAuthCheck')).to.be.a('function');
    });
  });

  describe('Routes', () => {
    it('should render ConnectedRouter with Provider', () => {
      wrapper = shallow(<Routes store={mockStore} />);
      const actual = wrapper.containsMatchingElement(
        <Provider store={mockStore}>
          <ConnectedRouter />
        </Provider>
      );
      expect(actual).to.eq(true);
    });
  });

  describe('NotFound', () => {
    wrapper = shallow(<NotFound />);
    const actual = wrapper.containsMatchingElement(
      <div className='container'><h2>Page not found :(</h2></div>
    );
    expect(actual).to.equal(true);
  });
});
