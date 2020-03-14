import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import EntityPageHeader from './index';
import DeleteModal from '../DeleteModal';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) EntityPageHeader', () => {
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
      ],
      author: 'test',
      releaseDate: '2019-08-10T11:17:02.883Z'
    },
    baseProps = {
      baseUrl: '/news',
      promiseLoading: false,
      article: mockArticle,
      heading: 'test',
      onDeleteArticle: sinon.spy(),
      showEditButton: true,
      showDeleteButton: true
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<EntityPageHeader {...props} />);
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
      wrapper = shallow(<EntityPageHeader {...props} />);
    });

    it('should render container class name', () => {
      expect(wrapper.find('.heading-with-btns').length).to.eq(1);
      wrapper.setProps({
        longHeading: true
      });
      expect(wrapper.find('.heading-with-btns.long-heading').length).to.eq(1);
    });

    it('should render props.heading', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>{props.heading}</h2>
      );
      expect(actual).to.equal(true);
    });

    describe('when there is no props.heading', () => {
      it('should render article.title', () => {
        wrapper.setProps({
          heading: undefined
        });
        const actual = wrapper.containsMatchingElement(
          <h2>{mockArticle.title}</h2>
        );
        expect(actual).to.equal(true);
      });
    });

    it('should render `author`', () => {
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab author'>{mockArticle.author}</p>
      );
      expect(actual).to.eq(true);
    });

    it('should render `releaseDate`', () => {
      const expectedDate = moment(mockArticle.releaseDate).format('DD MMM YYYY');
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab'>Released {expectedDate}</p>
      );
      expect(actual).to.eq(true);
    });

    describe('when article has `createdAt`', () => {
      it('should render `createdAt` with copy', () => {
        const mockDate = '2019-08-10T11:17:02.883Z';
        wrapper.setProps({
          article: {
            ...mockArticle,
            createdAt: mockDate
          }
        });
        const expectedDate = moment(mockDate).format('DD MMM YYYY');
        const actual = wrapper.containsMatchingElement(
          <p className='small-tab'>Released {expectedDate}</p>
        );
        expect(actual).to.eq(true);
      });
    });

    it('should render `releaseDate`', () => {
      const expectedDate = moment(mockArticle.releaseDate).format('DD MMM YYYY');
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab'>Released {expectedDate}</p>
      );
      expect(actual).to.eq(true);
    });

    describe('when an article has `editedAt`', () => {
      it('should render `editedAt` with copy', () => {
        const mockDate = '2019-08-10T11:17:02.883Z';
        wrapper.setProps({
          article: {
            ...mockArticle,
            editedAt: mockDate
          }
        });
        const expectedDate = moment(mockDate).fromNow();
        const actual = wrapper.containsMatchingElement(
          <p className='small-tab'>Edited {expectedDate}</p>
        );
        expect(actual).to.eq(true);
      });
    });

    it('should be render an `edit article` button', () => {
      const editButton = wrapper.find(Link);
      expect(editButton.length).to.eq(1);
      const expectedTo = `${baseProps.baseUrl}/${baseProps.article._id}/edit`;
      expect(editButton.prop('to')).to.eq(expectedTo);
    });

    describe('delete article button', () => {
      beforeEach(() => {
        props = baseProps;
        props.article = mockArticle;
        props.handleModalOpen = sinon.spy();
        props.handleModalClose = () => { };
        props.promiseLoading = false;
        wrapper = shallow(<EntityPageHeader {...props} />);
      });

      it('should not render <DeleteModal /> by default', () => {
        const actual = wrapper.containsMatchingElement(
          <DeleteModal
            handleModalClose={wrapper.instance().handleModalClose}
            onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
          />
        );
        expect(actual).to.equal(false);
      });

      it('should set state and render <DeleteModal />', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        const actual = wrapper.containsMatchingElement(
          <DeleteModal
            handleModalClose={wrapper.instance().handleModalClose}
            onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });

});
