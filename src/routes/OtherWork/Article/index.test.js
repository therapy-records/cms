import React from 'react'
import moment from 'moment';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Article } from './index'
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';
import PromiseError from '../../../components/PromiseError';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) OtherWork - OtherWork', () => {
  let wrapper,
    props,
    mockArticle = {
      _id: 'asdf1234',
      title: 'test',
      bodyMain: '<p>dummy copy</p><div>something<h2>title</h2></div>',
      mainImageUrl: 'http://test.com/hi.jpg',
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

  describe('on componentWillUnmount', () => {
    let props,
      wrapper;
    beforeEach(() => {
      props = {
        ...baseProps,
        resetPromiseState: sinon.spy(),
        onDeleteArticle: sinon.spy()
      }
      wrapper = shallow(<Article {...props} />);
    });
    it('should call resetPromiseState', () => {
      wrapper.unmount();
      expect(props.resetPromiseState.calledOnce).to.eq(true);
    });
  });

  describe('when promise is loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = true;
      wrapper = shallow(<Article {...props} />);
    });
    it('should show loading', () => {
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner />
      );
      expect(actual).to.equal(true);
    });
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
          <h4>Successfully deleted!</h4>
          <p>redirecting...</p>
        </div>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when promise errors', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseError = true;
      wrapper = shallow(<Article {...props} />);
    });
    it('should render <PromiseError />', () => {
      const actual = wrapper.containsMatchingElement(
        <PromiseError message='fetching other-work article' />
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
      it('should render mainImageUrl if it exists', () => {
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.mainImageUrl}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });
    });

    it('should render externalLink', () => {
      const actual = wrapper.containsMatchingElement(
        <p>Links to: <a href={props.article.externalLink} target='_blank'>{props.article.externalLink}</a></p>
      );
      expect(actual).to.equal(true);
    });

    it('should render releaseDate', () => {
      const actual = wrapper.containsMatchingElement(
        <p>Release date: {moment(props.article.releaseDate).fromNow()}</p>
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
    describe('handleModalOpen/handleModalClose', ( ) => {
      wrapper = shallow(<Article {...props} />);
      expect(wrapper.instance().state.isShowingModal).to.eq(false);
      wrapper.instance().handleModalOpen();
      expect(wrapper.instance().state.isShowingModal).to.eq(true);
      wrapper.instance().handleModalClose();
      expect(wrapper.instance().state.isShowingModal).to.eq(false);
    });

    describe('handleOnDeleteArticle', () => {
      it('should call props.onDeleteArticle', () => {
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().handleOnDeleteArticle(props.article);
        expect(props.onDeleteArticle.calledOnce).to.eq(true);
        expect(props.onDeleteArticle.calledWith(props.article._id)).to.eq(true);
      })
    });

    describe('handleModalOnDelete', () => {
      it('should call handleOnDeleteArticle and handleModalClose', () => {
        wrapper = shallow(<Article {...props} />);
        const handleOnDeleteArticleSpy = sinon.spy();
        const handleModalCloseSpy = sinon.spy();
        wrapper.instance().handleOnDeleteArticle = handleOnDeleteArticleSpy;
        wrapper.instance().handleModalClose = handleModalCloseSpy;

        wrapper.instance().handleModalOnDelete();
        expect(handleOnDeleteArticleSpy.calledOnce).to.eq(true);
        expect(handleModalCloseSpy.calledOnce).to.eq(true);
      });
    });

    describe('handleOnDeleteArticle', () => {
      it('should call props.onDeleteArticle', () => {
        wrapper = shallow(<Article {...props} />);
        wrapper.instance().handleOnDeleteArticle = sinon.spy();
        wrapper.instance().handleOnDeleteArticle(props.article);
        expect(props.onDeleteArticle.calledOnce).to.eq(true);
      })
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
          onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
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

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
