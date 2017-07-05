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
          {/*
          {deletedState ? (
            <div>
              <h4>Successfully deleted!</h4>
              <p>redirecting..</p>
            </div>
          ) : (
            <div>
              <h4>Are you sure you want to delete this post?</h4>
              <p>It will be gone forever!</p>
              <button className='btn' onClick={() => {
                this.props.onDeleteArticle(article._id)
              }}>Delete post</button>
            </div>
          )}
          */}
          <p>are you sure you want to delete?...</p>
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
