import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import moment from 'moment';
import { fetchJournalismArticles } from '../../../actions/journalism';
import { setSelectedJournalismArticle } from '../../../actions/journalismArticle';
import { resetPromiseState } from '../../../actions/uiState';
import {
  selectJournalismArticlesReverse,
  selectJournalismHasFetched
} from '../../../selectors/journalism';
import { selectUiStateLoading } from '../../../selectors/uiState';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import List from '../../../components/List';

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
                <h2>Journalism ✍️</h2>
              </div>
              <div className='action-btns'>
                <Link to='journalism/create' className='btn'>Create</Link>
              </div>
            </div>

            {hasArticles
              ? (
                <List
                  data={articles}
                  route='journalism'
                  onItemClick={this.handleButtonClick}
                  onViewButtonClick={this.handleButtonClick}
                  onEditButtonClick={this.handleButtonClick}
                />
              ) : (
                <div>
                  <EmptyArticlesMessage type='journalism' />
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
