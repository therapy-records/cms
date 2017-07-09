import React from 'react'
import PropTypes from 'prop-types'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import ArticleLive from '../ArticleLive/ArticleLive'
import './ArticlePreview.scss'

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    }
  }

  handleModalOpen = () => this.setState({ isShowingModal: true })
  handleModalClose = () => this.setState({ isShowingModal: false })

  render() {
    const {
      post
    } = this.props;
    return (
      <div>
        <button onClick={this.handleModalOpen} className='btn-sm btn-width-auto btn-preview'>Preview</button>
        {this.state.isShowingModal &&
          <ModalContainer onClose={this.handleModalClose}>
            <ModalDialog onClose={this.handleModalClose} className='modal-dialog-large'>
              <ArticleLive article={post} />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

ArticlePreview.propTypes = {
  post: PropTypes.object.isRequired
}

export default ArticlePreview;
