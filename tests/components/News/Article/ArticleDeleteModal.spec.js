import React from 'react'
import ArticleDeleteModal from 'routes/News/Article/components/ArticleDeleteModal'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { shallow } from 'enzyme'

describe('(Component) News - ArticleDeleteModal', () => {
  let wrapper,
      props = {
        handleModalClose: () => {},
        onDeleteArticle: () => {}
      }

  it('should render <ModalContainer />', () => {
    wrapper = shallow(<ArticleDeleteModal {...props} />);
    const actual = wrapper.containsMatchingElement(
      <ModalContainer>
        <ModalDialog>
          <p>are you sure you want to delete?...</p>
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(true);
  });
  
});
