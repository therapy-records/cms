import React from 'react'
import ArticleDeleteModal from 'routes/News/Article/components/ArticleDeleteModal'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
        onDeleteArticle: sinon.spy()
      };
      const buttonWrapper = shallow(<ArticleDeleteModal {...buttonProps} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(buttonProps.onDeleteArticle).to.have.been.called.once;
    });
  });
});