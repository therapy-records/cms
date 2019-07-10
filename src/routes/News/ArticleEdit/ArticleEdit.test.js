import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import ConnectedArticleEdit, { ArticleEdit } from './index';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import { selectSelectedNewsArticle } from '../../../selectors/news';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleEdit', () => {
  let wrapper;
  let props = {
    onEditArticle: () => {},
    onFetchArticle: () => { },
    onDestroyArticle: () => {},
    resetPromiseState: () => {},
    onAddArticleSection: () => {},
    article: { title: 'test', id: 'asdf1234' },
    location: {
      pathname: 'article/edit'
    },
    match: {
      params: { id: 123 }
    }
  };

  beforeEach(() => {
    wrapper = shallow(<ArticleEdit {...props} />);
  });

  describe('methods', () => {

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        wrapper.unmount();
        expect(resetPromiseStateSpy).to.have.been.called;
        expect(resetPromiseStateSpy).to.have.been.calledOnce;
      });

      it('should call onDestroyArticle', () => {
        const onDestroyArticleSpy = sinon.spy();
        wrapper.setProps({
          onDestroyArticle: onDestroyArticleSpy
        });
        wrapper.unmount();
        expect(onDestroyArticleSpy).to.have.been.called;
        expect(onDestroyArticleSpy).to.have.been.calledOnce;
      });
    });

    describe('componentWillMount', () => {
      it('should call onFetchArticle if there is no article', () => {
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} article={{}} />);
        wrapper.unmount();
        expect(props.onFetchArticle).to.have.been.called;
        expect(props.onFetchArticle).to.have.been.calledOnce;
      });
      it('should call onFetchArticle if there is no article', () => {
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} article={{ title: 'test' }} />);
        wrapper.unmount();
        expect(props.onFetchArticle).to.have.been.called;
        expect(props.onFetchArticle).to.have.been.calledOnce;
      });
    });

    describe('renderHtml', () => {
      it('should return an object with `__html` property', () => {
        const mockData = {test: true};
        const result = wrapper.instance().renderHtml(mockData);
        expect(result).to.deep.eq({
          __html: mockData
        })
      });
    });
  });

  describe('rendering', () => {
  
    it('should render a NewsArticleForm', () => {
      wrapper = shallow(<ArticleEdit {...props} />);
      const actual = wrapper.containsMatchingElement(
        <NewsArticleForm
          onSubmitForm={props.onPostArticle}
          onAddArticleSection={props.onAddArticleSection}
          location={props.location}
        />
      );
      expect(actual).to.equal(true);
    });
    describe('when promise is loading', () => {
      beforeEach(() => {
        props.promiseLoading = true;
        wrapper = shallow(<ArticleEdit {...props} />);
      });
      it('should show loading', () => {
        const actual = wrapper.containsMatchingElement(
          <LoadingSpinner
            active={props.promiseLoading}
            fullScreen
          />
        );
        expect(actual).to.equal(true);
      });
    });

    describe('when article is successfully posted, promise not loading and article.editSuccess', () => {
      beforeEach(() => {
        props.promiseLoading = false;
        props.promiseSuccess = true;
        props.article.editSuccess = true;
        wrapper = shallow(<ArticleEdit {...props} />);
      });

      it('should show success message and link', () => {
        const actual = wrapper.containsAllMatchingElements([
          <h2>Successfully updated! <small>🚀</small></h2>,
          <Link to='/news'>Go to news</Link>
        ]);
        expect(actual).to.equal(true);
      });
    });
  });

  describe('ConnectedArticleEdit', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false,
        promiseSuccess: false
      },
      location: {},
      selectedNewsArticle: {
        test: true
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedArticleEdit
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.props();
      expect(renderedProps.article).to.eq(selectSelectedNewsArticle(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState));
      expect(renderedProps.location).to.eq(mockStoreState.location);
    });
  });
});
