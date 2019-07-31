import React from 'react'
import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import moment from 'moment';
import ConnectedArticle, { Article } from './index'
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - Article', () => {
  let wrapper,
    props,
    mockArticle = {
      _id: 'asdf1234',
      title: 'hello world',
      sections: [
        {
          images: [
            { url: 'http:/test1.com' },
            { url: 'http:/test2.com' }
          ],
          copy: '<p>test</p>'
        },
        {
          images: [
            { url: 'http:/test3.com' },
            { url: 'http:/test4.com' }
          ],
          copy: '<p>test</p>'
        }
      ]
    },
    baseProps = {
      onFetchNewsArticles: sinon.spy(),
      onDeleteArticle: sinon.spy(),
      resetPromiseState: sinon.spy(),
      onDestroyArticle: sinon.spy(),
      onFetchArticle: sinon.spy(),
      params: { id: 123 },
      history: {
        location: {
          pathname: 'news/123456789'
        }
      },
      match: {
        params: {
          id: 1234
        }
      },
      article: mockArticle
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<Article {...props} />);
  });

  describe('methods', () => {
    describe('componentWillUnmount', () => {
      const resetPromiseStateSpy = sinon.spy();
      const onDestroyArticleSpy = sinon.spy();
      beforeEach(() => {
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy,
          onDestroyArticle: onDestroyArticleSpy
        });
      });

      it('should call resetPromiseState', () => {
        wrapper.unmount();
        expect(resetPromiseStateSpy.calledOnce).to.eq(true);
      });

      it('should call onDestroyArticle', () => {
        wrapper = shallow(<Article {...props} />);
        wrapper.unmount();
        expect(onDestroyArticleSpy.calledOnce).to.eq(true);
      });
    });

    describe('handleModalOpen', () => {
      it('should set state.isShowingModal to true', () => {
        wrapper.instance().handleModalOpen();
        expect(wrapper.instance().state.isShowingModal).to.eq(true);
      });
    });

    describe('handleModalClose', () => {
      it('should set state.isShowingModal to false', () => {
        wrapper.instance().handleModalClose();
        expect(wrapper.instance().state.isShowingModal).to.eq(false);
      });
    });

    describe('renderHtml', () => {
      it('should return an object', () => {
        const actual = wrapper.instance().renderHtml('<p>test</p>');
        expect(actual).to.deep.eq({
          __html: '<p>test</p>'
        });
      });
    });

    describe('handleOnDeleteArticle', () => {
      it('should call props.onDeleteArticle', () => {
        const onDeleteArticleSpy = sinon.spy();
        wrapper.setProps({
          onDeleteArticle: onDeleteArticleSpy
        });
        wrapper.instance().handleOnDeleteArticle();
        expect(onDeleteArticleSpy).to.have.been.calledOnce;
        expect(onDeleteArticleSpy).to.have.been.calledWith(
          props.article._id
        );
      });

      it('should call handleModalClose', () => {
        const handleModalCloseSpy = sinon.spy();
        wrapper.instance().handleModalClose = handleModalCloseSpy;
        wrapper.instance().handleOnDeleteArticle();
        expect(handleModalCloseSpy).to.have.been.calledOnce;
      });

    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<Article {...props} />);
    });

    it('should render <LoadingSpinner />', () => {
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner
          active={props.promiseLoading}
          fullScreen
        />
      );
      expect(actual).to.equal(true);
    });

    describe('when article is deleted', () => {
      beforeEach(() => {
        props = baseProps;
        const deletedArticle = { isDeleted: true };
        props.article = deletedArticle;
        wrapper = shallow(<Article {...props} />);
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

      describe('with promiseLoading', () => {
        it('should NOT render <LoadingSpinner /> with active prop', () => {
          wrapper.setProps({
            promiseLoading: true
          });
          const loadingSpinner = wrapper.find('LoadingSpinner');
          expect(loadingSpinner.prop('active')).to.eq(false);
        });
      });
    });

    describe('when an article does not exist / article._id is undefined', () => {
      beforeEach(() => {
        props = baseProps;
        props.article = {};
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
      });
      it('should call onFetchArticle', () => {
        expect(props.onFetchArticle.calledOnce).to.eq(true);
      });
    });

    describe('when an article id does not match param ID', () => {
      it('should call onFetchArticle', () => {
        props = baseProps;
        props.article = { _id: 456 };
        props.params = { id: 123 };
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        expect(props.onFetchArticle.calledOnce).to.eq(true);
      });
    });

    describe('when there is no param ID', () => {
      it('should call onFetchArticle', () => {
        props = baseProps;
        props.article = { _id: 456 };
        props.params = {};
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        expect(props.onFetchArticle.calledOnce).to.eq(true);
      });
    });

    describe('when an article exists', () => {
      beforeEach(() => {
        wrapper.setProps({
          ...baseProps,
          article: mockArticle
        });
      });

      it('should render a title', () => {
        const actual = wrapper.containsMatchingElement(
          <h2>{mockArticle.title}</h2>
        );
        expect(actual).to.equal(true);
      });

      describe('when an article has `editedAt`', () => {
        it('should render `last modified` copy with date', () => {
          const mockEditedAtDate = 'Wed Jul 31 2019 08:54:44 GMT+0100';
          wrapper.setProps({
            article: {
              ...mockArticle,
              editedAt: mockEditedAtDate
            }
          });
          const modifiedDiv = wrapper.find('.heading-modified');
          const expectedDate1 = moment(mockEditedAtDate).fromNow();
          const expectedDate2 = moment(mockEditedAtDate).format('DD/mm/YYYY');
          const actual = modifiedDiv.containsMatchingElement(
            <p>Last modified {expectedDate1}
              <small>{expectedDate2}</small>
            </p>
          );
          expect(actual).to.eq(true);
        });
      });

      it('should be render an `edit article` button', () => {
        const editButton = wrapper.find(Link);
        expect(editButton.length).to.equal(1);
      });

      describe('sections', () => {
        it('should render an image for each section', () => {
          const actual = wrapper.containsAllMatchingElements([
            <img
              key={mockArticle.sections[0].images[0].url}
              src={mockArticle.sections[0].images[0].url}
              alt='Fiona Ross'
            />,
            <img
              key={mockArticle.sections[1].images[1].url}
              src={mockArticle.sections[1].images[1].url}
              alt='Fiona Ross'
            />
          ]);
          expect(actual).to.equal(true);
        });

        it('should render `copy` for each section', () => {
          const actual = wrapper.containsAllMatchingElements([
            <div
              key='test1'
              dangerouslySetInnerHTML={
                wrapper.instance().renderHtml(mockArticle.sections[0].copy)
              }
            />,
            <div
              key='test2'
              dangerouslySetInnerHTML={
                wrapper.instance().renderHtml(mockArticle.sections[1].copy)
              }
            />
            ]);
          expect(actual).to.equal(true);
        });
      });
    });

    describe('delete article button', () => {
      beforeEach(() => {
        props = baseProps;
        props.article = mockArticle;
        props.handleModalOpen = sinon.spy();
        props.handleModalClose = () => { };
        props.promiseLoading = false;
        wrapper = shallow(<Article {...props} />);
      });

      it('should not render <ArticleDeleteModal /> by default', () => {
        const actual = wrapper.containsMatchingElement(
          <ArticleDeleteModal
            handleModalClose={wrapper.instance().handleModalClose}
            onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
          />
        );
        expect(actual).to.equal(false);
      });

      it('should set state and render <ArticleDeleteModal />', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        const actual = wrapper.containsMatchingElement(
          <ArticleDeleteModal
            handleModalClose={wrapper.instance().handleModalClose}
            onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
          />
        );
        expect(actual).to.equal(true);
      });
    });    
  });

  describe('ConnectedArticle', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      selectedNewsArticle: {},
      uiState: {
        promiseLoading: false,
        promiseSuccess: true
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedArticle
          store={store}
          history={{}}
          match={{}}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.props();
      expect(renderedProps.article).to.eq(selectSelectedNewsArticle(mockStoreState)),
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState)),
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState))
    });
  });

});
