import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import moment from 'moment';
// import { fetchNewsArticles, fetchNewsQueueArticles } from '../../../reducers/news';
import { fetchNewsArticles } from '../../../reducers/news';
import { setSelectedNewsArticle } from '../../../reducers/newsArticle';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  selectNewsArticlesReverse
  // selectNewsArticlesQueueReverse
} from '../../../selectors/news';
import LoadingSpinner from '../../../components/LoadingSpinner';

const dateIsBefore = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
};

export class News extends React.Component {
  componentWillMount() {
    // if (this.props.articlesQueue === null) {
    //   this.props.onFetchNewsQueueArticles();
    // }
    if (this.props.newsArticles === null) {
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
        <img src={articleImg()} alt={p.title} />
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
      // articlesQueue,
      newsArticles
    } = this.props;

    // let _combinedArticles = (articlesQueue || newsArticles) && this.getCombinedArticles(articlesQueue, newsArticles);
    let _combinedArticles = newsArticles && this.getCombinedArticles(newsArticles);

    const hasCombinedArticles = (_combinedArticles !== null) && (_combinedArticles && _combinedArticles.length);

    return (
      <div className='container'>
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading &&
          <div>
            <div className='news-feed-header'>
              <Link to='news/create' className='btn'>Create a new article</Link>
            </div>
            {
              hasCombinedArticles ? (
                <ul>
                  {_combinedArticles.map((p) => this.renderPost(p))}
                </ul>
              ) : (
                <p>No articles yet.</p>
              )
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
  // onFetchNewsQueueArticles: PropTypes.func.isRequired,
  onSetSelectedNewsArticle: PropTypes.func.isRequired,
  articlesQueue: PropTypes.array,
  newsArticles: PropTypes.array,
  combinedArticles: PropTypes.array,
  resetPromiseState: PropTypes.func
}


const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  // onFetchNewsQueueArticles: () => fetchNewsQueueArticles(),
  onSetSelectedNewsArticle: (article) => setSelectedNewsArticle(article),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  newsArticles: selectNewsArticlesReverse(state)
  // articlesQueue: selectNewsArticlesQueueReverse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
