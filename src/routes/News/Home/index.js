import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNewsArticles } from '../../../actions/news';
import { setSelectedNewsArticle } from '../../../actions/newsArticle';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectNewsArticlesReverse,
  selectNewsHasFetched
} from '../../../selectors/news';
import { selectUiStateLoading } from '../../../selectors/uiState';
import LoadingSpinner from '../../../components/LoadingSpinner';
import List from '../../../components/List';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

const dateIsBefore = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt)
};

export class News extends React.Component {
  componentDidMount() {
    const {
      hasFetchedArticles,
      onFetchNewsArticles
    } = this.props;

    if (!hasFetchedArticles) {
      onFetchNewsArticles();
    }
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
            <div className='heading-with-btns'>
              <div>
                <h2>News 🗞️️️️</h2>
              </div>
              <div className='action-btns'>
                <Link to='news/create' className='btn'>Create</Link>
              </div>
            </div>

            {
              hasCombinedArticles ? (
                <List
                  data={articles}
                  route='news'
                  onItemClick={this.handleButtonClick}
                  onViewButtonClick={this.handleButtonClick}
                  onEditButtonClick={this.handleButtonClick}
                  itemsHaveMultipleImages
                />
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
  resetPromiseState: PropTypes.func.isRequired,
  articles: PropTypes.array,
  combinedArticles: PropTypes.array
}

News.defaultProps = {
  promiseLoading: false,
  articles: [],
  combinedArticles: []
}

const mapStateToProps = (state, props) => ({
  promiseLoading: selectUiStateLoading(state),
  hasFetchedArticles: selectNewsHasFetched(state),
  articles: selectNewsArticlesReverse(state)
});

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onSetSelectedNewsArticle: (article) => setSelectedNewsArticle(article),
  resetPromiseState: () => resetPromiseState()
};

export default connect(mapStateToProps, mapDispatchToProps)(News)
