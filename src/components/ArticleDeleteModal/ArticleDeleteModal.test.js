import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ArticleDeleteModal from './ArticleDeleteModal'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleDeleteModal', () => {
  let wrapper,
      props = {
        handleModalClose: () => {},
        onDeleteArticle: () => {}
      }

  it('should render <ModalContainer />', () => {
    wrapper = shallow(<ArticleDeleteModal {...props} />);
    const actual = wrapper.containsMatchingElement(
      <ModalContainer onClose={props.handleModalClose}>
        <ModalDialog onClose={props.handleModalClose}>
          <div>
            <h4>Are you sure you want to delete this article?</h4>
            <p>It will be gone forever!</p>
            <button onClick={props.onDeleteArticle}>Delete article</button>
          </div>
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(true);
  });

  describe('delete button', () => {
    it('should call props.onDeleteArticle onClick', () => {
      const buttonProps = {
        ...props,
        onDeleteArticle: sinon.spy()
      };
      const buttonWrapper = shallow(<ArticleDeleteModal {...buttonProps} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(buttonProps.onDeleteArticle.calledOnce).to.eq(true);
    });
  });
});
