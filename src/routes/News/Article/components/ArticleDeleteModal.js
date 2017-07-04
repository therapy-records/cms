import React from 'react'
import PropTypes from 'prop-types'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ArticleDeleteModal extends React.Component {
  render() {
    // const {
    //   isDeleted
    // } = this.props;
    return (
      <ModalContainer onClose={this.handleModalClose}>
        <ModalDialog onClose={this.handleModalClose}>
          {deletedState ? ( // eslint:disable-line
            <div>
              <h4>Successfully deleted!</h4>
              <p>redirecting..</p>
            </div>
          ) : (
            <div>
              <h4>Are you sure you want to delete this post?</h4>
              <p>It will be gone forever!</p>
              {/* <button className='btn' onClick={() => { this.props.onDeleteArticle(article._id) }}>Delete post</button> */}
              <button className='btn' onClick={this.handleModalClose}>Cancel</button>
            </div>
          )}
        </ModalDialog>
      </ModalContainer>
    )
  }
}

ArticleDeleteModal.propTypes = {
  isDeleted: PropTypes.bool,
  handleModalClose: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired  
}

export default ArticleDeleteModal
