import React from 'react'
import PropTypes from 'prop-types'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false
    }
  }

  handleModalOpen = () => this.setState({ isShowingModal: true })
  handleModalClose = () => this.setState({ isShowingModal: false })

  render(){
    const {
      post
    } = this.props;
    return (
      <div>
        <button onClick={this.handleModalOpen}>Preview post</button>
        {this.state.isShowingModal &&
          <ModalContainer onClose={this.handleModalClose}>
            <ModalDialog onClose={this.handleModalClose}>
              <h3>{post.title}</h3>
              <img src={post.mainImageUrl} />
              <p>full article template here...</p>
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
