import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import ArticleHeader from './index';
import ArticleDeleteModal from '../ArticleDeleteModal';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ArticleHeader', () => {
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
      onDeleteArticle: sinon.spy(),
      article: mockArticle
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<ArticleHeader {...props} />);
  });

  describe('methods', () => {

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
      wrapper = shallow(<ArticleHeader {...props} />);
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

    describe('delete article button', () => {
      beforeEach(() => {
        props = baseProps;
        props.article = mockArticle;
        props.handleModalOpen = sinon.spy();
        props.handleModalClose = () => { };
        props.promiseLoading = false;
        wrapper = shallow(<ArticleHeader {...props} />);
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
