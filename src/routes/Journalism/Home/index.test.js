import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ConnectedJournalism, { Journalism } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import List from '../../../components/List';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import {
  selectJournalismHasFetched,
  selectSelectedJournalismArticle
} from '../../../selectors/journalism';
import {selectUiStateLoading} from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

const createJournalismArticles = (ids) => {
  const articles = [];
  ids.map(id => {
    articles.push({
      title: `test ${id}`,
      _id: `asd12${id}`,
      releaseDate: new Date(),
      externalLink: 'http://test.com',
      imageUrl: 'http://test.com'
    })
  });
  return articles;
}

const mockJournalismArticles = createJournalismArticles([1, 2, 3]);

describe('(Component) Journalism - Home', () => {
  let wrapper,
    props,
    baseProps = {
      hasFetchedArticles: true,
      onFetchJournalismArticles: () => {},
      onSetSelectedJournalismArticle: sinon.spy(),
      articles: mockJournalismArticles,
      resetPromiseState: sinon.spy()
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<Journalism {...props} />);
  });

  describe('rendering', () => {
    it('should render <LoadingSpinner />', () => {
      wrapper.setProps({
        promiseLoading: true
      });
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner
          active={props.promiseLoading}
          fullScreen
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render <List />', () => {
      const expectedDataProp = props.articles.sort((a, b) =>
        new Date(a.releaseDate) - new Date(b.releaseDate)
      ).reverse();
     
      const actual = wrapper.containsMatchingElement(
        <List
          data={expectedDataProp}
          route='journalism'
          onItemClick={wrapper.instance().handleButtonClick}
          onViewButtonClick={wrapper.instance().handleButtonClick}
          onEditButtonClick={wrapper.instance().handleButtonClick}
        />
      );
      expect(actual).to.equal(true);
    });

    describe('when promiseLoading is false', () => {
      it('should render a page title', () => {
        const actual = wrapper.containsMatchingElement(
          <h2>Journalism ✍️</h2>
        );
        expect(actual).to.equal(true);
      });
      it('should render a create button', () => {
        const actual = wrapper.containsMatchingElement(
          <Link to='journalism/create' className='btn'>Create</Link>
        );
        expect(actual).to.equal(true);
      });
    });

    describe('when no articles', () => {
      it('should render a message with button link', () => {
        const wrapper = shallow(
          <Journalism
            articles={[]}
            hasFetchedArticles={false}
            onFetchJournalismArticles={() => { }}
            onSetSelectedJournalismArticle={() => { }}
            resetPromiseState={() => {}}
          />
        );
        const actual = wrapper.containsMatchingElement(
          <EmptyArticlesMessage type='journalism' />
        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('methods', () => {
    describe('componentDidMount', () => {
      it('should call onFetchNewsArticles when props.hasFetchedArticles is FALSE', () => {
        const onFetchJournalismArticlesSpy = sinon.spy();
        wrapper.setProps({
            hasFetchedArticles: false,
            onFetchJournalismArticles: onFetchJournalismArticlesSpy
        });

        wrapper.instance().componentDidMount();
        expect(onFetchJournalismArticlesSpy.calledOnce).to.eq(true);
      });
    });

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        wrapper.instance().componentWillUnmount();
        expect(resetPromiseStateSpy).to.have.been.called;
      });
    });

    describe('handleButtonClick', () => {
      it('should call props.onSetSelectedJournalismArticle', () => {
        const onSetSelectedJournalismArticleSpy = sinon.spy();
        wrapper.setProps({
          onSetSelectedJournalismArticle: onSetSelectedJournalismArticleSpy
        });
        wrapper.instance().handleButtonClick({test: true});
        expect(onSetSelectedJournalismArticleSpy).to.have.been.calledWith({ test: true })
      });
    });
  });
  
  describe('ConnectedJournalism', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false
      },
      location: {},
      journalism: {
        articles: [
          {test: true},
          {test: true}
        ],
        hasFetched: false
      },
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedJournalism
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.hasFetchedArticles).to.eq(selectJournalismHasFetched(mockStoreState));
      expect(renderedProps.article).to.eq(selectSelectedJournalismArticle(mockStoreState));
    });
  });

});
