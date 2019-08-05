import React from 'react';
import moment from 'moment';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import ConnectedArticle, { Article } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import redirect from '../../../utils/redirect';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Journalism - Article', () => {
  let wrapper,
    props,
    mockArticle = {
      _id: 'asdf1234',
      title: 'test',
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
      },
      promiseLoading: false
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
  
  describe('when props.article.isDeleted', () => {
    it('should call redirect util', () => {
      const redirectSpy = sinon.spy();
      redirect.redirectHistory = redirectSpy;

      wrapper = shallow(<Article {...props} />);
      wrapper.setProps({
        article: { isDeleted: true }
      });
      expect(redirectSpy).to.have.been.called;
    });
  });

  it('should render <LoadingSpinner />', () => {
    const actual = wrapper.containsMatchingElement(
      <LoadingSpinner
        active={props.promiseLoading && !baseProps.article.isDeleted}
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
      props = baseProps;
      props.article = mockArticle;
      wrapper = shallow(<Article {...props} />);
    });

    describe('<ArticleHeader />', () => {
      it('should render', () => {
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.length).to.eq(1);
        expect(articleHeader.prop('baseUrl')).to.eq('/journalism');
        expect(articleHeader.prop('article')).to.eq(mockArticle);
        expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
        expect(articleHeader.prop('promiseLoading')).to.eq(props.promiseLoading);
        expect(articleHeader.prop('showEditButton')).to.eq(true);
        expect(articleHeader.prop('showDeleteButton')).to.eq(true);
      });

      describe('onDeleteArticle prop', () => {
        it('should call props.onDeleteArticle with article id', () => {
          const onDeleteArticleSpy = sinon.spy();
          wrapper.setProps({
            onDeleteArticle: onDeleteArticleSpy
          });
          const articleHeader = wrapper.find('ArticleHeader');
          articleHeader.props().onDeleteArticle();
          expect(onDeleteArticleSpy).to.have.been.calledWith(mockArticle._id)
        });
      });
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

  });

  describe('methods', () => {
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
