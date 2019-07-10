import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import ConnectedArticle, { Article } from './index'
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Journalism - Journalism', () => {
  let wrapper,
    props,
    mockArticle = {
      _id: 'asdf1234',
      title: 'test',
      bodyMain: '<p>dummy copy</p><div>something<h2>title</h2></div>',
      imageUrl: 'http://test.com/hi.jpg',
      releaseDate: new Date(),
      editedAt: new Date(),
      externalLink: 'http://test.com'
    },
    baseProps = {
      resetPromiseState: sinon.spy(),
      onDeleteArticle: sinon.spy(),
      onDestroyArticle: sinon.spy(),
      onFetchArticle: sinon.spy(),
      params: { id: 123 },
      article: mockArticle,
      match: {
        params: {
          id: 1234
        }
      }
    };
  props = baseProps;

  describe('methods', () => {
    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        props.resetPromiseState = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().componentWillUnmount();
        expect(props.resetPromiseState).to.have.been.called;
      });

      it('should call onDestroyArticle', () => {
        props.onDestroyArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().componentWillUnmount();
        expect(props.onDestroyArticle).to.have.been.called;
      });
    });
    describe('componentWillMount', () => {
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
    });
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
      props = baseProps;
      props.article = mockArticle;
      wrapper = shallow(<Article {...props} />);
    });
    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>{props.article.title}</h2>
      );
      expect(actual).to.equal(true);
    });

    describe('main image', () => {
      it('should render imageUrl if it exists', () => {
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.imageUrl}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });
    });

    it('should render externalLink', () => {
      const actual = wrapper.containsMatchingElement(
        <p><a href={props.article.externalLink} target='_blank'>{props.article.externalLink}</a></p>
      );
      expect(actual).to.equal(true);
    });

    it('should render releaseDate', () => {
      const actual = wrapper.containsMatchingElement(
        <p>Released: {moment(props.article.releaseDate).fromNow()}</p>
      );
      expect(actual).to.equal(true);
    });

    it('should render editedAt', () => {
      const actual = wrapper.containsMatchingElement(
        <p>Last modified {moment(props.article.editedAt).fromNow()}
          <small>{moment(props.article.editedAt).format('DD/mm/YYYY')}</small>
        </p>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('methods', () => {
    describe('handleModalOpen/handleModalClose', () => {
      wrapper = shallow(<Article {...props} />);
      expect(wrapper.instance().state.isShowingModal).to.eq(false);
      wrapper.instance().handleModalOpen();
      expect(wrapper.instance().state.isShowingModal).to.eq(true);
      wrapper.instance().handleModalClose();
      expect(wrapper.instance().state.isShowingModal).to.eq(false);
    });

    describe('handleModalOnDelete', () => {
      it('should call props.onDeleteArticle', () => {
        wrapper = shallow(<Article {...props} />);
        const onDeleteArticleSpy = sinon.spy();
        wrapper.setProps({
          onDeleteArticle: onDeleteArticleSpy
        });
        wrapper.instance().handleModalOnDelete();
        expect(onDeleteArticleSpy.calledOnce).to.eq(true);
      });

      it('should call handleModalClose', () => {
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().handleModalClose = sinon.spy();
        wrapper.instance().handleModalOnDelete(props.article);
        expect(wrapper.instance().handleModalClose.calledOnce).to.eq(true);
      });

    });

    describe('renderHtml', () => {
      it('should return an object', () => {
        wrapper = shallow(<Article {...props} />);
        const actual = wrapper.instance().renderHtml('<p>test</p>');
        expect(actual).to.deep.eq({
          __html: '<p>test</p>'
        });
      })
    });
  });

  describe('edit article button', () => {
    it('should be rendered', () => {
      let props = baseProps;
      wrapper = shallow(<Article {...props} />);
      const editButton = wrapper.find(Link);
      expect(editButton.length).to.equal(1);
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
          onDeleteArticle={wrapper.instance().handleModalOnDelete}
        />
      );
      expect(actual).to.equal(false);
    });

    it('should render <ArticleDeleteModal />', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      const actual = wrapper.containsMatchingElement(
        <ArticleDeleteModal
          handleModalClose={wrapper.instance().handleModalClose}
          onDeleteArticle={wrapper.instance().handleModalOnDelete}
        />
      );
      expect(actual).to.equal(true);
    });
  });
  describe('ConnectedArticle', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false,
        promiseSuccess: false
      },
      location: {},
      selectedJournalismArticle: mockArticle
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedArticle
          store={store}
          location={mockStoreState.location}
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
