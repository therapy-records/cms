import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import moment from 'moment';
import './News.scss'

class News extends React.Component {
  componentWillMount() {
    if (!this.props.articlesQueue ||
        !this.props.articlesQueue.length) {
     this.props.onFetchNewsQueueArticles();
    }
    if (!this.props.newsArticles ||
        !this.props.newsArticles.length) {
      this.props.onFetchNewsArticles();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  getCombinedArticles(queueFeed, newsFeed) {
    if (!queueFeed) {
      return newsFeed;
    } else if (!newsFeed) {
      return queueFeed;
    }
    return [...queueFeed, ...newsFeed];
  }

  handleButtonClick(postObj) {
    this.props.onSetSelectedNewsArticle(postObj);
  }

  renderPost(p) {
    const articleImg = () => {
      if (p.mainImageUrl) {
        return p.mainImageUrl;
      } else if (p.miniGalleryImages && p.miniGalleryImages.length) {
        return p.miniGalleryImages[0];
      }
      return null;
    }
    return (
      <div key={p._id} className='news-card'>
        <div className='bg-inner'
             style={{ backgroundImage: `url('${articleImg()}')` }} />
        <div className='inner'>
          {p.scheduledTime &&
            <p
              style={{ background: '#333', padding: '0.5em', fontSize: '0.8em', display: 'inline-flex' }}>
              Scheduled for {moment(p.scheduledTime).format('DD/mm/YYYY')}
            </p>
          }
          <h3>{p.title}</h3>
          {p.createdAt && <p>{moment(p.createdAt).fromNow()}</p>}
          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`news/${p._id}`}
            className='btn'
          >
            View
          </Link>
          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`news/${p._id}/edit`}
            className='btn'
          >
            Edit
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      articlesQueue,
      newsArticles
    } = this.props;

    let _combinedArticles = (articlesQueue || newsArticles) && this.getCombinedArticles(articlesQueue, newsArticles);

    return (
      <div>
        <div className='news-feed-header'>
          <Link to='news/create'>Create a new article</Link>
        </div>
        <br />

        {/*
          !_combinedArticles || !_combinedArticles.length && (
          <p>Unable to fetch news article :(</p>
        )
        */}

        {_combinedArticles &&
          <div className='flex-root'>
            {_combinedArticles.map((p) => this.renderPost(p))}
          </div>
        }
      </div>
    )
  }
}

News.propTypes = {
  onFetchNewsArticles: PropTypes.func.isRequired,
  onFetchNewsQueueArticles: PropTypes.func.isRequired,
  onSetSelectedNewsArticle: PropTypes.func.isRequired,
  articlesQueue: PropTypes.array,
  newsArticles: PropTypes.array,
  combinedArticles: PropTypes.array,
  resetPromiseState: PropTypes.func
}

export default News
