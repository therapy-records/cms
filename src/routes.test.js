import React from 'react'
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routes, { Router, ConnectedRouter, NotFound } from './routes';
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
import Collaborators from './routes/Collaborators/Home';
import CollaboratorsCreate from './routes/Collaborators/Create';
import CollaboratorView from './routes/Collaborators/View';
import CollaboratorEdit from './routes/Collaborators/Edit';
import Gigs from './routes/Gigs';
import GigCreate from './routes/Gigs/Create';
import GigsView from './routes/Gigs/View';
import GigEdit from './routes/Gigs/Edit';
import VideosHome from './routes/Videos/Home';
import GalleryHome from './routes/Gallery/Home';
import GalleryImageCreate from './routes/Gallery/Create';
import GalleryImageView from './routes/Gallery/View';
import AnalyticsHome from './routes/Analytics/Home';

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

  it('should render <StickyAuthError />', () => {
    const actual = wrapper.containsMatchingElement(
      <StickyAuthError />
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
        component={PressHome}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render press create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/press/create"
        component={PressCreate}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render press view route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/press/:id"
        component={PressView}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render press edit route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/press/:id/edit"
        component={PressEdit}
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
        component={CollaboratorView}
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

  it('should render gig create route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gigs/create"
        component={GigCreate}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gig view route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gigs/:id"
        component={GigsView}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gig edit route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gigs/:id/edit"
        component={GigEdit}
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
        component={VideosHome}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gallery route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gallery"
        component={GalleryHome}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gallery upload route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gallery/upload"
        component={GalleryImageCreate}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render gallery view route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/gallery/:id"
        component={GalleryImageView}
        isAuth={props.isAuth}
        onAuthCheck={props.onAuthCheck}
        exact
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render analytics route', () => {
    const actual = wrapper.containsMatchingElement(
      <ProtectedRoute
        path="/analytics"
        component={AnalyticsHome}
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
