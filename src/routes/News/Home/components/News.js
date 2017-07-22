import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import moment from 'moment';
import './News.scss'

class News extends React.Component {
  componentWillMount() {
    if (!this.props.postsQueue ||
        !this.props.postsQueue.length) {
     this.props.onFetchNewsQueuePosts();
    }
    if (!this.props.newsPosts ||
        !this.props.newsPosts.length) {
      this.props.onFetchNewsPosts();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  getCombinedPosts(queueFeed, newsFeed) {
    return [...queueFeed, ...newsFeed];
  }

  renderPost(p) {
    return (
      <div key={p._id} className='news-card'>
        <div className='bg-inner' style={{ backgroundImage: `url('${p.mainImageUrl}')` }} />
        <div className='inner'>
          {p.scheduledTime &&
            <p
              style={{ background: '#333', padding: '0.5em', fontSize: '0.8em', display: 'inline-flex' }}>
              Scheduled for {moment(p.scheduledTime).format('DD/mm/YYYY')}
            </p>
          }
          <h3>{p.title}</h3>
          {p.createdAt && <p>{moment(p.createdAt).fromNow()}</p>}
          <Link to={`news/${p._id}`} className='btn'>View</Link>
          <Link to={`news/${p._id}/edit`} className='btn'>Edit</Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      postsQueue,
      newsPosts
    } = this.props;

    let _combinedPosts = this.getCombinedPosts(postsQueue, newsPosts);
    return (
      <div>
        <div className='news-feed-header'>
          <Link to='news/create'>Create a new post</Link>
        </div>
        <br />

        {/*
          !_combinedPosts || !_combinedPosts.length && (
          <p>Unable to fetch news posts :(</p>
        )
        */}

        {_combinedPosts &&
          <div className='flex-root'>
            {_combinedPosts.map((p) => this.renderPost(p))}
          </div>
        }
      </div>
    )
  }
}

News.propTypes = {
  onFetchNewsPosts: PropTypes.func.isRequired,
  onFetchNewsQueuePosts: PropTypes.func.isRequired,
  postsQueue: PropTypes.array,
  newsPosts: PropTypes.array,
  combinedPosts: PropTypes.array,
  resetPromiseState: PropTypes.func
}

export default News
