import React from 'react'
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedArticleEdit, {ArticleEdit} from './index';
import JournalismForm from '../../../components/JournalismForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
selectUiStateLoading,
selectUiStateSuccess
} from '../../../selectors/uiState';
import {
  selectSelectedJournalismArticle,
  selectJournalismEditSuccess
} from '../../../selectors/journalism';
import FormSuccess from '../../../components/FormElements/FormSuccess';
import redirect from '../../../utils/redirect';

Enzyme.configure({adapter: new Adapter()});

describe('(Component) Journalism - ArticleEdit', () => {
  let wrapper;
  let props = {
    onEditArticle: () => {},
    onFetchArticle: () => {},
    onDestroyArticle: () => {},
    resetPromiseState: () => {},
    onResetEditSuccess: () => {},
    article: {title: 'test', _id: 'asdf1234'},
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

      describe('when there is no props.match.params.id', () => {
        it('should call onDestroyArticle', () => {
          const onDestroyArticleSpy = sinon.spy();
          wrapper.setProps({
            onDestroyArticle: onDestroyArticleSpy,
            match: {
              params: {}
            }
          });
          wrapper.unmount();
          expect(onDestroyArticleSpy).to.have.been.called;
          expect(onDestroyArticleSpy).to.have.been.calledOnce;
        });
      });

      it('should call onResetEditSuccess', () => {
        const onResetEditSuccessSpy = sinon.spy();
        wrapper.setProps({
          onResetEditSuccess: onResetEditSuccessSpy
        });
        wrapper.unmount();
        expect(onResetEditSuccessSpy).to.have.been.called;
        expect(onResetEditSuccessSpy).to.have.been.calledOnce;
      });
    });

    describe('componentDidMount', () => {
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
          articleId={props.article._id}
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

    describe('when article is successfully posted, promise not loading and editSuccess', () => {
      beforeEach(() => {
        props.promiseLoading = false;
        props.promiseSuccess = true;
        props.editSuccess = true;
        wrapper = shallow(<ArticleEdit {...props} />);
      });

      it('should render <FormSuccess />', () => {
        const actual = wrapper.containsMatchingElement(
          <FormSuccess
            baseUrl='/journalism'
            copy={{
              homeLink: 'Go to Journalism'
            }}
          />
        );
        expect(actual).to.equal(true);
      });
    });

    describe('when article is deleted', () => {
      beforeEach(() => {
        const deletedArticle = { isDeleted: true };
        props.article = deletedArticle;
        wrapper = shallow(<ArticleEdit {...props} />);
      });

      it('should have correct copy', () => {
        const actual = wrapper.containsMatchingElement(
          <div>
            <h2>Successfully deleted! <small>🚀</small></h2>
            <p>Redirecting...</p>
          </div>
        );
        expect(actual).to.equal(true);
      });

      it('should NOT render <JournalismForm />', () => {
        const journalismForm = wrapper.find('JournalismForm');
        expect(journalismForm.length).to.eq(0);
      });

      it('should call redirect util', () => {
        const redirectSpy = sinon.spy();
        redirect.redirectHistory = redirectSpy;

        wrapper = shallow(<ArticleEdit {...props} />);
        wrapper.setProps({
          article: { isDeleted: true }
        });
        expect(redirectSpy).to.have.been.called;
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
      },
      journalism: {
        editSuccess: false
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
      renderedProps = wrapper.dive().props();
      expect(renderedProps.article).to.eq(selectSelectedJournalismArticle(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState));
      expect(renderedProps.editSuccess).to.eq(selectJournalismEditSuccess(mockStoreState));
      expect(renderedProps.location).to.eq(mockStoreState.location);
    });
  });
});
