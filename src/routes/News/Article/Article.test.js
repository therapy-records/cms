import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedArticle, { Article } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import redirect from '../../../utils/redirect';
import entityHeading from '../../../utils/entityHeading';

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
            { cloudinaryUrl: 'http:/test1.com' },
            { cloudinaryUrl: 'http:/test2.com' }
          ],
          copy: '<p>test</p>'
        },
        {
          images: [
            { cloudinaryUrl: 'http:/test3.com' },
            { cloudinaryUrl: 'http:/test4.com' }
          ],
          copy: '<p>test</p>',
          videoEmbed: '<iframe />'
        }
      ]
    },
    baseProps = {
      onFetchNewsArticles: sinon.spy(),
      onDeleteEntity: sinon.spy(),
      resetPromiseState: sinon.spy(),
      onDestroyArticle: sinon.spy(),
      onFetchArticle: sinon.spy(),
      onSetSelectedNewsArticle: sinon.spy(),
      promiseLoading: false,
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
    describe('componentDidUpdate', () => {
      const resetPromiseStateSpy = sinon.spy();
      const onDestroyArticleSpy = sinon.spy();
      beforeEach(() => {
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy,
          onDestroyArticle: onDestroyArticleSpy
        });
      });

      it('should call onSetSelectedNewsArticle', () => {
        props = baseProps;
        props.article = { _id: 456 };
        props.onSetSelectedNewsArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().componentDidUpdate();
        expect(props.onSetSelectedNewsArticle.calledOnce).to.eq(true);
      });

    });

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

      describe('when location.pathname includes `edit`', () => {
        it('should NOT call onDestroyArticle', () => {
          props.onDestroyArticle = sinon.spy();
          props.history.location.pathname = '/test/1234/edit'
          wrapper = shallow(<Article {...props} />);
          wrapper.instance().componentWillUnmount();
          expect(props.onDestroyArticle).to.not.have.been.called;
        });
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
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<Article {...props} />);
        expect(props.onFetchArticle.calledOnce).to.eq(true);
      });
    });

    describe('when there is no param ID', () => {
      it('should call onFetchArticle', () => {
        props = baseProps;
        props.article = { _id: 456 };
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

      describe('<PageHeader />', () => {
        it('should render', () => {
          const pageHeader = wrapper.find('PageHeader');
          expect(pageHeader.length).to.eq(1);
          expect(pageHeader.prop('entityCollection')).to.eq('news');
          expect(pageHeader.prop('entity')).to.eq(mockArticle);
          expect(pageHeader.prop('heading')).to.eq(entityHeading(mockArticle));
          expect(pageHeader.prop('onDeleteEntity')).to.be.a('function');
          expect(pageHeader.prop('promiseLoading')).to.eq(props.promiseLoading);
          expect(pageHeader.prop('renderEditButton')).to.eq(true);
          expect(pageHeader.prop('renderDeleteButton')).to.eq(true);
        });

        describe('onDeleteEntity prop', () => {
          it('should call props.onDeleteEntity with article id', () => {
            const onDeleteEntitySpy = sinon.spy();
            wrapper.setProps({
              onDeleteEntity: onDeleteEntitySpy
            });
            const pageHeader = wrapper.find('PageHeader');
            pageHeader.props().onDeleteEntity();
            expect(onDeleteEntitySpy).to.have.been.calledWith(mockArticle._id)
          });
        });
      });
      
      describe('sections', () => {

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

        it('should render an image for each section', () => {
          const actual = wrapper.containsAllMatchingElements([
            <img
              key={mockArticle.sections[0].images[0].cloudinaryUrl}
              src={mockArticle.sections[0].images[0].cloudinaryUrl}
              alt='Fiona Ross'
            />,
            <img
              key={mockArticle.sections[1].images[1].cloudinaryUrl}
              src={mockArticle.sections[1].images[1].cloudinaryUrl}
              alt='Fiona Ross'
            />
          ]);
          expect(actual).to.equal(true);
        });

        it('should render `videoEmbed` in a section', () => {
          const actual = wrapper.containsMatchingElement(
            <div
              key='test2'
              dangerouslySetInnerHTML={
                wrapper.instance().renderHtml(mockArticle.sections[1].videoEmbed)
              }
            />
          );
          expect(actual).to.equal(true);
        });

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
      renderedProps = wrapper.dive().props();
      expect(renderedProps.article).to.eq(selectSelectedNewsArticle(mockStoreState)),
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState)),
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState))
    });
  });

});
