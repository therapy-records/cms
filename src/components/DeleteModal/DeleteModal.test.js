import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactModal from 'react-modal';
import DeleteModal from './DeleteModal';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DeleteModal', () => {
  let wrapper,
    props = {
      handleModalClose: () => {},
      onDeleteArticle: () => {}
    }

  it('should render <ReactModal />', () => {
    wrapper = shallow(
      <DeleteModal {...props} />
    );
    const actual = wrapper.containsMatchingElement(
      <ReactModal
        isOpen
        shouldCloseOnOverlayClick
        onRequestClose={props.handleModalClose}
        className='modal'
        overlayClassName='modal-overlay'
      >
        <div>
          <h4>Are you sure you want to delete?</h4>
          <p>It will be gone forever!</p>
          <button
            className='btn btn-danger cancel-margin'
            onClick={props.onDeleteArticle}
          >Delete</button>
        </div>
      </ReactModal>
    );
    expect(actual).to.equal(true);
  });

  describe('delete button', () => {
    it('should call props.onDeleteArticle onClick', () => {
      const buttonProps = {
        ...props,
        onDeleteArticle: sinon.spy()
      };
      const buttonWrapper = shallow(<DeleteModal {...buttonProps} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(buttonProps.onDeleteArticle.calledOnce).to.eq(true);
    });
  });
});

