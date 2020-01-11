import React from 'react'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routes, { Router, ConnectedRouter, NotFound } from './routes';
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
import CollaboratorsView from './routes/Collaborators/View';
import CollaboratorEdit from './routes/Collaborators/Edit';
import Gigs from './routes/Gigs';
import Videos from './routes/Videos';

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
      store: mockStore,
      isAuth: false,
      onAuthCheck: sinon.spy()
    };

  beforeEach(() => {
    wrapper = shallow(<Router {...props} />);
  });

  it('should render <StickyError />', () => {
    const actual = wrapper.containsMatchingElement(
      <StickyError />
    );
    expect(actual).to.equal(true);
  });

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
        onAuthCheck={props.onAuthCheck}
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
        onAuthCheck={props.onAuthCheck}
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
        onAuthCheck={props.onAuthCheck}
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
        onAuthCheck={props.onAuthCheck}
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
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render journalism home route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/journalism"
        component={JournalismHome}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render journalism create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/journalism/create"
        component={JournalismArticleCreate}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render journalism create article route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/journalism/:id"
        component={JournalismArticle}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render journalism article edit route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/journalism/:id/edit"
        component={JournalismArticleEdit}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
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
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gigs route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gigs"
        component={Gigs}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render collaborators route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/collaborators"
        component={Collaborators}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render collaborators create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/collaborators/create"
        component={CollaboratorsCreate}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render collaborators view route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/collaborators/:id"
        component={CollaboratorsView}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render collaborators view route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/collaborators/:id/edit"
        component={CollaboratorEdit}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });


  it('should render videos route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/videos"
        component={Videos}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
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
      expect(connectedRoutes.dive().prop('isAuth')).to.eq(mockState.user.isAuth);
      expect(connectedRoutes.dive().prop('onAuthCheck')).to.be.a('function');
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
