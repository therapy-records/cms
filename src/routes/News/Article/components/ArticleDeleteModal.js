import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ArticleDeleteModal extends React.Component {
  render() {
    const {
      handleModalClose,
      onDeleteArticle
    } = this.props;

    return (
      <ModalContainer onClose={handleModalClose}>
        <ModalDialog onClose={handleModalClose}>

          <div>
            <h4>Are you sure you want to delete this post?</h4>
            <p>It will be gone forever!</p>
            <button
              className='btn'
              onClick={onDeleteArticle}
            >Delete post</button>
          </div>

        </ModalDialog>
      </ModalContainer>
    )
  }
}

ArticleDeleteModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
}

export default ArticleDeleteModal
