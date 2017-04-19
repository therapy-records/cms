import React from 'react'
import { browserHistory } from 'react-router'
import moment from 'moment';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class NewsPost extends React.Component {

  state = {
    isShowingModal: false
  }

  handleModalOpen = () => this.setState({isShowingModal: true})
  handleModalClose = () => this.setState({isShowingModal: false})

  componentWillMount(){
    if (!this.props.newsPosts) {
      this.props.onFetchNews();
    }
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { newsPost } = this.props;
    let deletedState = false;

    // todo: fix me so that promise success for deletion is seen via 
    // state.uiState. or similar.
    // this logic is based on previous approach of 'selecteNewsPost' in store.

    // if (newsPost.message && newsPost.message === 'Post deleted') {
    //   deletedState = true;
    //   setTimeout(() => {
    //     browserHistory.push('/news');
    //   }, 1000)
    // }

    return (
      <article>
       {
        newsPost && newsPost.title ? (
          <div className='flex-root'>
            <div>
              <h2>{newsPost.title}</h2>
              <img src="http://placehold.it/350x150" />
              <div dangerouslySetInnerHTML={this.renderHtml(newsPost.mainBody)}></div>
            </div>
            <div>
              <p><a href={`http://fionaross.co.uk/news/${newsPost._id}`}>View live post</a></p>
              <p>Created {moment(newsPost.createdAt).fromNow()} <small>{moment(newsPost.createdAt).format('DD/mm/YYYY')}</small></p>
              {newsPost.editedAt && 
                <p>Last modified {moment(newsPost.editedAt).fromNow()} <small>{moment(newsPost.editedAt).format('DD/mm/YYYY')}</small></p>
              }
              <button 
                className='btn' 
                onClick={this.handleModalOpen} 
                style={{width: 'auto', background: 'darkred', color: '#fff'}}>Delete post
              </button>
            </div>
          </div>
        ) : (
          <p>error fetching news post :(</p>
        )
       }

        {
         this.state.isShowingModal &&
          <ModalContainer onClose={this.handleModalClose}>
            <ModalDialog onClose={this.handleModalClose}>
            {deletedState ? (
              <div>
                <h4>Successfully deleted!</h4>
                <p>redirecting..</p>
              </div>
            ) : (
              <div>
                <h4>Are you sure you want to delete this post?</h4>
                <p>It will be gone forever!</p>
                <button className='btn' onClick={() => { this.props.onDeleteNewsPost(newsPost._id) }}>Delete post</button>
                <button className='btn' onClick={this.handleModalClose}>Cancel</button>
              </div>
            )}
            </ModalDialog>
          </ModalContainer>
        }

      </article>
    )
  }
}

NewsPost.propTypes = {
  location: React.PropTypes.object.isRequired,
  onDeleteNewsPost: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired
}

export default NewsPost
