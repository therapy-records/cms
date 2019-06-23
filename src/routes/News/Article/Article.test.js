import React from 'react'

import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Article } from './index'
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';

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
    describe('on componentWillUnmount', () => {
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

    describe('renderHtml', () => {
      it('should return an object', () => {
        const actual = wrapper.instance().renderHtml('<p>test</p>');
        expect(actual).to.deep.eq({
          __html: '<p>test</p>'
        });
      })
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

});
