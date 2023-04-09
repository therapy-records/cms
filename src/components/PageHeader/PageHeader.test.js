import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import PageHeader from './index';
import DeleteModal from '../DeleteModal';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) PageHeader', () => {
  let wrapper,
    props,
    mockEntity = {
      _id: 'asdf1234',
      title: 'hello world',
      categoryId: 1,
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
      promiseLoading: false,
      entity: mockEntity,
      entityCollection: 'collaborators',
      heading: 'test',
      onDeleteEntity: sinon.spy(),
      renderEditButton: true,
      renderDeleteButton: true,
      renderCreateButton: true
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<PageHeader {...props} />);
  });

  describe('methods', () => {

    describe('handleOnModalOpen', () => {
      it('should set state.isShowingModal to true', () => {
        wrapper.instance().handleOnModalOpen();
        expect(wrapper.instance().state.isShowingModal).to.eq(true);
      });
    });

    describe('handleOnModalClose', () => {
      it('should set state.isShowingModal to false', () => {
        wrapper.instance().handleOnModalClose();
        expect(wrapper.instance().state.isShowingModal).to.eq(false);
      });
    });

    describe('handleOnDelete', () => {
      it('should call props.onDeleteEntity', () => {
        const onDeleteEntitySpy = sinon.spy();
        wrapper.setProps({
          onDeleteEntity: onDeleteEntitySpy
        });
        wrapper.instance().handleOnDelete();
        expect(onDeleteEntitySpy).to.have.been.calledOnce;
        expect(onDeleteEntitySpy).to.have.been.calledWith(
          props.entity._id
        );
      });

      it('should call handleOnModalClose', () => {
        const handleOnModalCloseSpy = sinon.spy();
        wrapper.instance().handleOnModalClose = handleOnModalCloseSpy;
        wrapper.instance().handleOnDelete();
        expect(handleOnModalCloseSpy).to.have.been.calledOnce;
      });

    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<PageHeader {...props} />);
    });

    it('should render container class name', () => {
      expect(wrapper.find('.page-header').length).to.eq(1);
      wrapper.setProps({
        longHeading: true
      });
      expect(wrapper.find('.page-header.long-heading').length).to.eq(1);
    });

    it('should render props.heading', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>{props.heading}</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render `categoryId`', () => {
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab category'>{mockEntity.categoryId}</p>
      );
      expect(actual).to.eq(true);
    });

    it('should render `author`', () => {
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab author'>{mockEntity.author}</p>
      );
      expect(actual).to.eq(true);
    });

    it('should render `releaseDate`', () => {
      const expectedDate = moment(mockEntity.releaseDate).format('DD MMM YYYY');
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab'>Released {expectedDate}</p>
      );
      expect(actual).to.eq(true);
    });

    describe('when entity has `createdAt`', () => {
      it('should render `createdAt` with copy', () => {
        const mockDate = '2019-08-10T11:17:02.883Z';
        wrapper.setProps({
          entity: {
            ...mockEntity,
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
      const expectedDate = moment(mockEntity.releaseDate).format('DD MMM YYYY');
      const actual = wrapper.containsMatchingElement(
        <p className='small-tab'>Released {expectedDate}</p>
      );
      expect(actual).to.eq(true);
    });

    describe('when an entity has `editedAt`', () => {
      it('should render `editedAt` with copy', () => {
        const mockDate = '2019-08-10T11:17:02.883Z';
        wrapper.setProps({
          entity: {
            ...mockEntity,
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

    it('should render an `edit` button', () => {
      const editButton = wrapper.find(Link).first();
      expect(editButton.length).to.eq(1);
      const expectedTo = `/${baseProps.entityCollection}/${baseProps.entity._id}/edit`;
      expect(editButton.prop('to')).to.eq(expectedTo);
    });

    describe('delete button', () => {
      beforeEach(() => {
        props = baseProps;
        props.entity = mockEntity;
        props.handleOnModalOpen = sinon.spy();
        props.handleOnModalClose = () => { };
        props.promiseLoading = false;
        wrapper = shallow(<PageHeader {...props} />);
      });

      it('should not render <DeleteModal /> by default', () => {
        const actual = wrapper.containsMatchingElement(
          <DeleteModal
            onModalClose={wrapper.instance().handleOnModalClose}
            onDelete={wrapper.instance().handleOnDelete}
          />
        );
        expect(actual).to.equal(false);
      });

      it('should set state and render <DeleteModal />', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        const actual = wrapper.containsMatchingElement(
          <DeleteModal
            onModalClose={wrapper.instance().handleOnModalClose}
            onDelete={wrapper.instance().handleOnDelete}
          />
        );
        expect(actual).to.equal(true);
      });
    });

    it('should render a `create` Link', () => {
      const editButton = wrapper.find(Link).last();
      expect(editButton.length).to.eq(1);
      const expectedTo = `/${baseProps.entityCollection}/create`;
      expect(editButton.prop('to')).to.eq(expectedTo);
    });

    describe('bespoke button', () => {
      it('should render bespokeButton element', () => {
        const mockBespokeButton = <button onClick={null}>test</button>;
        wrapper.setProps({
          bespokeButton: mockBespokeButton
        });
        const actual = wrapper.containsMatchingElement(mockBespokeButton);
        expect(actual).to.eq(true);
      });
    });

  });

});
