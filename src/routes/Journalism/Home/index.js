import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
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

export class Journalism extends React.Component {
  componentWillMount() {
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

  renderArticle(p) {
    return (
      <li key={p._id} className='article-card'>
        <img src={p.imageUrl} alt="" />
        <div>
          <div className='heading-with-btn'>
            <h3>
              <Link
                onClick={() => this.handleButtonClick(p)}
                to={`journalism/${p._id}`}
              >{p.title}
              </Link>
            </h3>
            {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
          </div>

          <p>Links to: {p.externalLink}</p>

          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`journalism/${p._id}`}
            className='btn btn-sm'
          >
            View
          </Link>
          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`journalism/${p._id}/edit`}
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

    const hasArticles = (articles && articles !== null) && articles.length;

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
                <h2>Journalism ✍️</h2>
              </div>
              <div className='action-btns'>
                <Link to='journalism/create' className='btn'>Create</Link>
              </div>
            </div>

            {hasArticles
              ? <div>
                <ul className='cancel-margin'>
                  {articles.map((p) => this.renderArticle(p))}
                </ul>
              </div>
              : (
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
  articles: PropTypes.array,
  resetPromiseState: PropTypes.func
};

Journalism.defaultProps = {
  articles: [],
  resetPromiseState: () => {}
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
