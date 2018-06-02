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
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

const dateIsBefore = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
};

export class News extends React.Component {
  componentWillMount() {
    // if (this.props.articlesQueue === null) {
    //   this.props.onFetchNewsQueueArticles();
    // }
    if (this.props.articles === null) {
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

  renderArticle(p) {
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
          {/*
            {p.scheduledTime &&
              <p
                className='small-tab'>
                Scheduled for {moment(p.scheduledTime).format('Do MMM \'YY')}
              </p>
            }
          */}
          <div className='heading-with-btn'>
            <h3>
              <Link
                onClick={this.handleButtonClick(p)}
                to={`news/${p._id}`}
              >{p.title}
              </Link>
            </h3>
            {p.createdAt && <p className='small-tab'>{moment(p.createdAt).fromNow()}</p>}
          </div>

          <Link
            onClick={this.handleButtonClick(p)}
            to={`news/${p._id}`}
            className='btn btn-sm'
          >
            View
          </Link>
          <Link
            onClick={this.handleButtonClick(p)}
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
      articles
    } = this.props;

    // let _combinedArticles = (articlesQueue || articles) && this.getCombinedArticles(articlesQueue, articles);
    let _combinedArticles = articles && this.getCombinedArticles(articles);

    const hasCombinedArticles = (_combinedArticles !== null) && (_combinedArticles && _combinedArticles.length);

    return (
      <div className='container'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading &&
          <div>
            <div className='heading-action-btns'>
              <div>
                <h2>News</h2>
              </div>
              <div className='action-btns'>
                <Link to='news/create' className='btn'>Create</Link>
              </div>
            </div>

            {
              hasCombinedArticles ? (
                <div>
                  <ul>
                    {_combinedArticles.map((p) => this.renderArticle(p))}
                  </ul>

                </div>
              ) : (
                <div>
                  <EmptyArticlesMessage type='news' />
                </div>
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
  articles: PropTypes.array,
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
