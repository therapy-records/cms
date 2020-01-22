import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

class ArticleDeleteModal extends React.Component {
  render() {
    const {
      handleModalClose,
      onDeleteArticle
    } = this.props;

    return (
      <ReactModal
        isOpen
        shouldCloseOnOverlayClick
        onRequestClose={handleModalClose}
        className='modal'
        overlayClassName='modal-overlay'
      >
        <div>
          <h4>Are you sure you want to delete?</h4>
          <p>It will be gone forever!</p>
          <button
            className='btn btn-danger cancel-margin'
            onClick={onDeleteArticle}
          >Delete article</button>
        </div>
      </ReactModal>
    )
  }
}

ArticleDeleteModal.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
}

export default ArticleDeleteModal
