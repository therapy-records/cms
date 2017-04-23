import React from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import moment from 'moment';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import './NewsPost.scss'

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

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const {
      newsPost,
      promiseLoading,
      promiseSuccess,
      promiseError
    } = this.props;
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
       {promiseLoading &&
         <h1>loading...</h1>
       }

       {(promiseSuccess && newsPost && newsPost.title) &&
        <div className='flex-root'>
          <div className='col-1'>
          <h2>{newsPost.title}</h2>
            <div dangerouslySetInnerHTML={this.renderHtml(newsPost.bodyMain)}></div>
            <br />
            <img src="http://placehold.it/350x150" />
          </div>
          <div className='col-2'>
            <div className='summary-box'>
              <div className='summary-box-inner'>
                {/* <p><a href={`http://fionaross.co.uk/news/${newsPost._id}`}>View live post</a></p> */}
                <p><a href={`http://fionaross.co.uk/news`} target='blank'>View live post</a></p>
                <p>Created {moment(newsPost.createdAt).fromNow()} <small>{moment(newsPost.createdAt).format('DD/mm/YYYY')}</small></p>
                {newsPost.editedAt && 
                  <p>Last modified {moment(newsPost.editedAt).fromNow()} <small>{moment(newsPost.editedAt).format('DD/mm/YYYY')}</small></p>
                }

                <Link to={`/news/${newsPost._id}/edit`} className='btn'>Edit post</Link>
                <button 
                  className='btn' 
                  onClick={this.handleModalOpen} 
                  style={{width: 'auto', background: 'darkred', color: '#fff'}}>Delete post
                </button>
              </div>
            </div>
          </div>
        </div>
       }

       {promiseError &&
        <p>error fetching news post :(</p>
       }

        {this.state.isShowingModal &&
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
  onDeleteNewsPost: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired,
  promiseLoading: React.PropTypes.bool,
  promiseSuccess: React.PropTypes.bool,
  promiseError: React.PropTypes.bool,
  resetPromiseState: React.PropTypes.func.isRequired
}

export default NewsPost
