import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

const dateIsBefore = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
};

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

  orderArticles(articles) {
    return articles.sort(dateIsBefore);
  }

  getCombinedArticles(queueFeed, newsFeed) {
    if (!queueFeed) {
      return this.orderArticles([...newsFeed]);
    } else if (!newsFeed) {
      return this.orderArticles([...queueFeed]);
    }
    return this.orderArticles([...queueFeed, ...newsFeed]);
  }

  handleButtonClick(postObj) {
    this.props.onSetSelectedNewsArticle(postObj);
  }

  renderPost(p) {
    const articleImg = () => {
      if (p.mainImage && p.mainImage.url) {
        return p.mainImage.url;
      } else if (p.miniGalleryImages && p.miniGalleryImages.length) {
        return p.miniGalleryImages[0];
      }
      return 'http://via.placeholder.com/100x137/C8C8C8/777?text=No+image&color=EEEEEE';
    }
    return (
      <li key={p._id} className='article-card'>
        <img src={articleImg()} />
        <div>
          {p.scheduledTime &&
            <p
              className='small-tab'>
              Scheduled for {moment(p.scheduledTime).format('Do MMM \'YY')}
            </p>
          }
          {(!p.scheduledTime && p.createdAt) && <p className='small-tab'>{moment(p.createdAt).fromNow()}</p>}
          <h3>
            <Link
              onClick={() => this.handleButtonClick(p)}
              to={`news/${p._id}`}
            >{p.title}
            </Link>
          </h3>

          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`news/${p._id}`}
            className='btn btn-sm'
          >
            View
          </Link>
          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`news/${p._id}/edit`}
            className='btn btn-sm'
          >
            Edit
          </Link>
        </div>
      </li>
    );
  }

  render() {
    const {
      promiseLoading,
      articlesQueue,
      newsArticles
    } = this.props;

    let _combinedArticles = (articlesQueue || newsArticles) && this.getCombinedArticles(articlesQueue, newsArticles);

    return (
      <div>
        {promiseLoading ?
          <p>Loading...</p> :
          <div>
            <div className='news-feed-header'>
              <Link to='news/create' className='btn'>Create a new article</Link>
            </div>
            {
              !_combinedArticles || !_combinedArticles.length && (
              <p>Unable to fetch articles :(</p>
              )
            }

            {_combinedArticles &&
              <ul>
                {_combinedArticles.map((p) => this.renderPost(p))}
              </ul>
            }
          </div>
        }
      </div>
    )
  }
}

News.propTypes = {
  promiseLoading: PropTypes.bool,
  onFetchNewsArticles: PropTypes.func.isRequired,
  onFetchNewsQueueArticles: PropTypes.func.isRequired,
  onSetSelectedNewsArticle: PropTypes.func.isRequired,
  articlesQueue: PropTypes.array,
  newsArticles: PropTypes.array,
  combinedArticles: PropTypes.array,
  resetPromiseState: PropTypes.func
}

export default News