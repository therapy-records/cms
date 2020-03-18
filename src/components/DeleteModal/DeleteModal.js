import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}

class DeleteModal extends React.Component {
  render() {
    const {
      onModalClose,
      onDelete
    } = this.props;

    return (
      <ReactModal
        isOpen
        shouldCloseOnOverlayClick
        onRequestClose={onModalClose}
        className='modal'
        overlayClassName='modal-overlay'
      >
        <div>
          <h4>Are you sure you want to delete?</h4>
          <p>It will be gone forever!</p>
          <button
            className='btn btn-danger cancel-margin'
            onClick={onDelete}
          >Delete</button>
        </div>
      </ReactModal>
    )
  }
}

DeleteModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
}

export default DeleteModal
