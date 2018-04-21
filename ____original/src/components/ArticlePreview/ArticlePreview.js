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
      article,
      disabled
    } = this.props;
    return (
      <div>
        <button
          onClick={this.handleModalOpen}
          disabled={disabled}
          className='btn-sm btn-width-auto btn-preview'>Preview
        </button>
        {this.state.isShowingModal &&
          <ModalContainer onClose={this.handleModalClose}>
            <ModalDialog onClose={this.handleModalClose} className='modal-dialog-large'>
              <ArticleLive article={article} />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  disabled: PropTypes.bool
}

export default ArticlePreview;
