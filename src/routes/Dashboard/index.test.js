import React from 'react'
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import ConnectedDashboard, { Dashboard } from './index'
import LoadingSpinner from '../../components/LoadingSpinner';
import { selectNewsArticles } from '../../selectors/news';
import { selectUiStateLoading } from '../../selectors/uiState';
import { selectJournalismArticles } from '../../selectors/journalism';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Dashboard', () => {
  let props,
    wrapper,
    mockArticles = [
      { title: 'test' },
      { title: 'testing' }
    ]

  beforeEach(() => {
    props = {
      newsArticles: mockArticles,
      journalismArticles: mockArticles,
      onFetchNewsArticles: () => mockArticles,
      onFetchJournalismArticles: () => mockArticles,
      resetPromiseState: () => {}
    }
    wrapper = shallow(<Dashboard {...props} />)
  });

  describe('methods', () => {
    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        props.resetPromiseState = sinon.spy();
        wrapper = shallow(<Dashboard {...props} />);
        wrapper.instance().componentWillUnmount();
        expect(props.resetPromiseState).to.have.been.called;
      });
    });
  });

  describe('rendering', () => {

    it('should render <LoadingSpinner />', () => {
      wrapper.setProps({
        promiseLoading: true
      });
      wrapper = shallow(<Dashboard {...props} />)
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner
          active={props.promiseLoading}
          fullScreen
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a heading', () => {
      const heading = wrapper.containsMatchingElement(
        <h2>Welcome back 👋</h2>
      );
      expect(heading).to.be.true;
    });

    it('should render a link to create a news', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='news/create'>Create News</Link>
      );
      expect(actual).to.be.true;
    });

    it('should render a link to create a journalism article', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='journalism/create'>Create Journalism</Link>
      );
      expect(actual).to.be.true;
    });

    it('should render a total amount of news articles', () => {
      const actual = wrapper.containsMatchingElement(
        <li>{props.newsArticles.length} News articles</li>
      );
      expect(actual).to.be.true;
    });

    it('should render a total amount of journalism articles', () => {
      const actual = wrapper.containsMatchingElement(
        <li>{props.journalismArticles.length} Journalism articles</li>
      );
      expect(actual).to.be.true;
    });

    describe('when newsArticles === null', () => {
      it('should call onFetchNewsArticles', () => {
        props.newsArticles = null;
        props.onFetchNewsArticles = sinon.spy();
        props.resetPromiseState = () => {};
        shallow(<Dashboard {...props} />)
        expect(props.onFetchNewsArticles).to.have.been.called;
      });
    });

    describe('when newsArticles is empty array', () => {
      it('should not call onFetchNewsArticles', () => {
        props.newsArticles = [];
        props.onFetchNewsArticles = sinon.spy();
        props.resetPromiseState = () => { };
        shallow(<Dashboard {...props} />)
        expect(props.onFetchNewsArticles).to.not.have.been.called;
      });
    });

    describe('when journalismArticles === null', () => {
      it('should call onFetchJournalismArticles', () => {
        props.journalismArticles = null;
        props.onFetchJournalismArticles = sinon.spy();
        props.resetPromiseState = () => { };
        shallow(<Dashboard {...props} />)
        expect(props.onFetchJournalismArticles).to.have.been.called;
      });
    });

    describe('when journalismArticles is empty array', () => {
      it('should not call onFetchJournalismArticles', () => {
        props.journalismArticles = [];
        props.onFetchJournalismArticles = sinon.spy();
        props.resetPromiseState = () => { };
        shallow(<Dashboard {...props} />)
        expect(props.onFetchJournalismArticles).to.not.have.been.called;
      });
    });

  });

  describe('ConnectedDashboard', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false,
        promiseSuccess: false
      },
      news: {
        articles: []
      },
      journalism: {
        articles: []
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedDashboard
          store={store}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.newsArticles).to.eq(selectNewsArticles(mockStoreState));
      expect(renderedProps.journalismArticles).to.eq(selectJournalismArticles(mockStoreState));
      expect(renderedProps.location).to.eq(mockStoreState.location);
    });
  });
});
