import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchJournalismArticles } from '../../../actions/journalism';
import { setSelectedJournalismArticle } from '../../../actions/journalismArticle';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectJournalismArticlesReverse,
  selectJournalismHasFetched
} from '../../../selectors/journalism';
import { selectUiStateLoading } from '../../../selectors/uiState';
import PageHeader from '../../../components/PageHeader';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyMessage from '../../../components/EmptyMessage';
import List from '../../../components/List';
import { getJournalismCategoryById } from '../../../helpers';

export class Journalism extends React.Component {
  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const {
      hasFetchedArticles,
      onFetchJournalismArticles
    } = this.props;

    if (!hasFetchedArticles) {
      onFetchJournalismArticles();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  handleButtonClick(postObj) {
    this.props.onSetSelectedJournalismArticle(postObj);
  }

  render() {
    const {
      promiseLoading,
      articles
    } = this.props;

    const hasArticles = (articles && articles !== null) && articles.length;

    let sortedArticles;

    if (hasArticles) {
      const mappedArticles = articles.map((article) => {
        const mapped = article;

        if (article.categoryId) {
          mapped.category = getJournalismCategoryById(article.categoryId).TEXT;
        }

        return mapped;
      });

      sortedArticles = mappedArticles.sort((a, b) =>
        new Date(a.releaseDate) - new Date(b.releaseDate)
      ).reverse();
    }

    return (
      <div className='container'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading &&
          <div>

            <PageHeader
              heading='Journalism ✍️'
              entityCollection='journalism'
              renderCreateButton
            />

            {hasArticles
              ? (
                <List
                  data={sortedArticles}
                  route='journalism'
                  onItemClick={this.handleButtonClick}
                  onViewButtonClick={this.handleButtonClick}
                  onEditButtonClick={this.handleButtonClick}
                />
              ) : (
                <div>
                  <EmptyMessage
                    entityName='journalism'
                    createCopy='Create a new Journalism article'
                  />
                </div>
              )}
          </div>
        }

      </div>
    )
  }
}

Journalism.propTypes = {
  promiseLoading: PropTypes.bool,
  hasFetchedArticles: PropTypes.bool.isRequired,
  onFetchJournalismArticles: PropTypes.func.isRequired,
  onSetSelectedJournalismArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  articles: PropTypes.array
};

Journalism.defaultProps = {
  articles: []
};

const mapDispatchToProps = {
  onFetchJournalismArticles: () => fetchJournalismArticles(),
  onSetSelectedJournalismArticle: (article) => setSelectedJournalismArticle(article),
  resetPromiseState: () => resetPromiseState()
};

const mapStateToProps = (state) => ({
  promiseLoading: selectUiStateLoading(state),
  hasFetchedArticles: selectJournalismHasFetched(state),
  articles: selectJournalismArticlesReverse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Journalism);
