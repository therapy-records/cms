import React from 'react'
import moment from 'moment';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class NewsPost extends React.Component {

  state = {
    isShowingModal: false,
  }

  handleModalOpen = () => this.setState({isShowingModal: true})
  handleModalClose = () => this.setState({isShowingModal: false})

  componentWillMount(){
    let id = this.props.location.pathname.replace('news/', '');
    this.props.onFetchNewsPost(id);
  }

  renderHtml(data) {
    return {__html: data}
  }

  componentWillUnmount(){
    this.props.onUnmount();
  }

  render() {
    const { newsPost } = this.props;
    return (
      <article>
       {
        newsPost && newsPost.title ? (
          <div>
            <h2>{newsPost.title}</h2>
            <p>Created {moment(newsPost.createdAt).fromNow()} <small>{moment(newsPost.createdAt).format('DD/mm/YYYY')}</small></p>
            {newsPost.editedAt && 
              <p>Last modified {moment(newsPost.editedAt).fromNow()} <small>{moment(newsPost.editedAt).format('DD/mm/YYYY')}</small></p>
            }
            <br />
            <br />
            <div dangerouslySetInnerHTML={this.renderHtml(newsPost.mainBody)}></div>
          </div>
        ) : (
          <p>error fetching news post :(</p>
        )
       }

       <br />
       <br />
       <br />

       <button 
         className='btn' 
         onClick={this.handleModalOpen} 
         style={{width: 'auto', background: 'darkred', color: '#fff'}}>Delete post
       </button>

        {
         this.state.isShowingModal &&
          <ModalContainer onClose={this.handleModalClose}>
            <ModalDialog onClose={this.handleModalClose}>
              <h4>Are you sure you want to delete this post?</h4>
              <p>It will be gone forever!</p>
              <button className='btn' onClick={() => { this.props.onDeleteNewsPost(newsPost._id) }}>Delete post</button>
              <button className='btn' onClick={this.handleModalClose}>Cancel</button>
            </ModalDialog>
          </ModalContainer>
        }

      </article>
    )
  }
}

NewsPost.propTypes = {
  location: React.PropTypes.object.isRequired,
  onFetchNewsPost: React.PropTypes.func.isRequired,
  onDeleteNewsPost: React.PropTypes.func.isRequired,
  onUnmount: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired
}

export default NewsPost
