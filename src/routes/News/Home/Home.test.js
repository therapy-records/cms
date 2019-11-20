import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import ConnectedNews, { News } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import List from '../../../components/List';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import {
  selectNewsArticlesReverse,
  selectNewsHasFetched
} from '../../../selectors/news';
import { selectUiStateLoading } from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

const mockArticles = [
  { title: 'test 1', _id: 'asd123', createdAt: new Date() },
  { title: 'test 2', _id: 'asd124', createdAt: new Date() },
  { title: 'test 3', _id: 'asd125', createdAt: new Date() }
];

describe('(Component) News - Home', () => {
  let wrapper,
      props;

  beforeEach(() => {
    props = {
      onFetchNewsArticles: () => { },
      onSetSelectedNewsArticle: () => { },
      resetPromiseState: () => { },
      articles: mockArticles,
      hasFetchedArticles: true
    };
    wrapper = shallow(<News {...props} />);
  });

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
    const actual = wrapper.containsMatchingElement(
      <List
        data={props.articles}
        route='news'
        onItemClick={wrapper.instance().handleButtonClick}
        onViewButtonClick={wrapper.instance().handleButtonClick}
        onEditButtonClick={wrapper.instance().handleButtonClick}
        itemsHaveMultipleImages
      />
    );
    expect(actual).to.equal(true);
  });

  describe('when promiseLoading is false', () => {

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>News 🗞️️️️</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render a create button', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='news/create' className='btn'>Create</Link>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when no articles', () => {
    it('should render a message with button link', () => {
      const wrapper = shallow(
        <News
          newsArticles={[]}
          onFetchNewsArticles={() => { }}
          onSetSelectedNewsArticle={() => { }}
          resetPromiseState={() => {}}
          hasFetchedArticles
        />
      );
      const actual = wrapper.containsMatchingElement(
        <EmptyArticlesMessage type='news' />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('methods', () => {

    describe('componentDidMount', () => {
      it('should call onFetchNewsArticles when props.hasFetchedArticles is FALSE', () => {
        const onFetchNewsArticlesSpy = sinon.spy();
        wrapper = shallow(<News {...props} />);
        wrapper.setProps({
          articles: null,
          hasFetchedArticles: false,
          onFetchNewsArticles: onFetchNewsArticlesSpy
        });
        wrapper.instance().componentDidMount();
        expect(onFetchNewsArticlesSpy.calledOnce).to.eq(true);
      });
    });

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        props.resetPromiseState = sinon.spy();
        wrapper = shallow(<News {...props} />);
        wrapper.instance().componentWillUnmount();
        expect(props.resetPromiseState).to.have.been.called;
      });
    });

    describe('handleButtonClick', () => {
      it('should call props.onSetSelectedJournalismArticle', () => {
        const setSelectedNewsArticleSpy = sinon.spy();
        wrapper.setProps({
          onSetSelectedNewsArticle: setSelectedNewsArticleSpy
        });
        wrapper.instance().handleButtonClick({ test: true });
        expect(setSelectedNewsArticleSpy).to.have.been.calledWith({ test: true })
      });
    });

  });

  describe('ConnectedNews', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      news: {
        articles: [],
        hasFetched: false
      },
      uiState: {
        promiseLoading: false
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedNews
          store={store}
          hasFetchedArticles={false}
        />
      );
    });   

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.hasFetchedArticles).to.eq(selectNewsHasFetched(mockStoreState));
      expect(renderedProps.articles).to.eq(selectNewsArticlesReverse(mockStoreState));
    });
  });

});
