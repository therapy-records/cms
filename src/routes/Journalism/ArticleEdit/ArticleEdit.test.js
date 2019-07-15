import React from 'react'
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import {Link} from 'react-router-dom';
import ConnectedArticleEdit, {ArticleEdit} from './index';
import JournalismForm from '../../../components/JournalismForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
selectUiStateLoading,
selectUiStateSuccess
} from '../../../selectors/uiState';
import {selectSelectedJournalismArticle} from '../../../selectors/journalism';

Enzyme.configure({adapter: new Adapter()});

describe('(Component) Journalism - ArticleEdit', () => {
  let wrapper;
  let props = {
    onEditArticle: () => {},
    onFetchArticle: () => {},
    onDestroyArticle: () => {},
    resetPromiseState: () => {},
    article: {title: 'test', id: 'asdf1234'},
    location: {
        pathname: 'article/edit'
    },
    match: {
        params: {id: 123}
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
        const onFetchArticleSpy = sinon.spy();
        wrapper = shallow(
          <ArticleEdit
            {...props}
            article={{}}
            onFetchArticle={onFetchArticleSpy}
          />
        );
        expect(onFetchArticleSpy).to.have.been.called;
        expect(onFetchArticleSpy).to.have.been.calledOnce;
      });
      it('should call onFetchArticle if there is no article id', () => {
        const onFetchArticleSpy = sinon.spy();
        wrapper = shallow(
          <ArticleEdit
            {...props}
            article={{title: 'test'}}
            onFetchArticle={onFetchArticleSpy}
          />
        );
        expect(onFetchArticleSpy).to.have.been.called;
        expect(onFetchArticleSpy).to.have.been.calledOnce;
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

    describe('handleOnEditArticle', () => {
      it('should call props.onEditArticle', () => {
        const onEditArticleSpy = sinon.spy();
        wrapper.setProps({
          onEditArticle: onEditArticleSpy
        })
        wrapper.instance().handleOnEditArticle();
        expect(onEditArticleSpy).to.have.been.calledOnce;
        expect(onEditArticleSpy).to.have.been.calledWith(props.article);
      });
    });
  });

  describe('rendering', () => {

    it('should render a JournalismForm', () => {
      wrapper = shallow(<ArticleEdit {...props} />);
      const actual = wrapper.containsMatchingElement(
        <JournalismForm
          onSubmitForm={wrapper.instance().handleOnEditArticle}
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
          <Link to='/journalism'>Go to Journalism</Link>
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
      selectedJournalismArticle: {
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
          match={{}}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.props();
      expect(renderedProps.article).to.eq(selectSelectedJournalismArticle(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState));
      expect(renderedProps.location).to.eq(mockStoreState.location);
    });
  });
});
