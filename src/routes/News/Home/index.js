import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import moment from 'moment';
import { fetchNewsArticles } from '../../../reducers/news';
import { setSelectedNewsArticle } from '../../../reducers/newsArticle';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  selectNewsArticlesReverse,
  selectNewsHasFetched
} from '../../../selectors/news';
import { selectUiStateLoading } from '../../../selectors/uiState';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import { getArticlesFirstImageUrl } from '../../../utils/news';

const dateIsBefore = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
};

export class News extends React.Component {
  componentWillMount() {
    const {
      hasFetchedArticles,
      onFetchNewsArticles
    } = this.props;

    if (!hasFetchedArticles) {
      onFetchNewsArticles();
    }
    // if (this.props.articles === null) {
    //   this.props.onFetchNewsArticles();
    // }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  orderArticles(articles) {
    return articles.sort(dateIsBefore);
  }

  // getCombinedArticles(newsFeed) {
  //   this.orderArticles(newsFeed);
  // }

  handleButtonClick(postObj) {
    this.props.onSetSelectedNewsArticle(postObj);
  }

  renderArticle(article) {
    return (
      <li key={article._id} className='article-card'>
        <img src={getArticlesFirstImageUrl(article, true)} alt={article.title} />
        <div>
          <div className='heading-with-btn'>
            <h3>
              <Link
                onClick={() => this.handleButtonClick(article)}
                to={`news/${article._id}`}
              >{article.title}
              </Link>
            </h3>
            {article.createdAt && <p className='small-tab'>{moment(article.createdAt).fromNow()}</p>}
          </div>

          <Link
            onClick={() => this.handleButtonClick(article)}
            to={`news/${article._id}`}
            className='btn btn-sm'
          >
            View
          </Link>
          <Link
            onClick={() => this.handleButtonClick(article)}
            to={`news/${article._id}/edit`}
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
      articles
    } = this.props;

    let _combinedArticles = articles && this.orderArticles(articles);

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
                  <ul className='cancel-margin'>
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
  hasFetchedArticles: PropTypes.bool.isRequired,
  onFetchNewsArticles: PropTypes.func.isRequired,
  onSetSelectedNewsArticle: PropTypes.func.isRequired,
  articles: PropTypes.array,
  combinedArticles: PropTypes.array,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onSetSelectedNewsArticle: (article) => setSelectedNewsArticle(article),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: selectUiStateLoading(state),
  hasFetchedArticles: selectNewsHasFetched(state),
  articles: selectNewsArticlesReverse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
