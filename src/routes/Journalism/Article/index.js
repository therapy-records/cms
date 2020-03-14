import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../actions/uiState';
import {
  deleteJournalismArticle,
  fetchSingleJournalismArticle,
  destroySelectedJournalismArticle,
  setSelectedJournalismArticle
} from '../../../actions/journalismArticle';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import EntityPageHeader from '../../../components/EntityPageHeader';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import LoadingSpinner from '../../../components/LoadingSpinner';
import redirect from '../../../utils/redirect';
import entityHeading from '../../../utils/entityHeading';
import './style.css';

export class Article extends React.Component {
  componentDidMount() {
    const propsArticle = this.props.article;
    const paramsId = this.props.match.params.id;
    const noArticle = !propsArticle ||
                      !propsArticle._id ||
                      !paramsId;

    const articleMatches = !noArticle && propsArticle._id === paramsId;
    if (noArticle || !articleMatches) {
      this.props.onFetchArticle(paramsId);
    }
  }

  componentDidUpdate() {
    const { article } = this.props;
    if (article && article._id) {
      this.props.onSetSelectedJournalismArticle(article);
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
    const { pathname } = this.props.history.location;
    if (!pathname.includes('edit')) {
      this.props.onDestroyArticle();
    }
  }

  renderHtml(data) {
    return { __html: data }
  }

  render() {
    const {
      article,
      promiseLoading,
      onDeleteEntity
    } = this.props;

    if (article && article.isDeleted) {
      redirect.redirectHistory(this.props.history, '/journalism');
    }

    return (
      <article className='container article article-journalism'>

        <LoadingSpinner
          active={promiseLoading && !article.isDeleted}
          fullScreen
        />

        {(article && article.isDeleted) &&
          <div>
            <h2>Successfully deleted! <small>🚀</small></h2>
            <p>Redirecting...</p>
          </div>
        }

        {(!promiseLoading && article && article.title && !article.isDeleted) && (
          <div>

            <EntityPageHeader
              baseUrl='/journalism'
              entity={article}
              heading={entityHeading(article)}
              onDeleteEntity={() => onDeleteEntity(article._id)}
              promiseLoading={promiseLoading}
              showEditButton
              showDeleteButton
              longHeading
            />

            <div className='entity-container'>

              <div className='flex-root'>

                <div className='entity-image-container'>
                  <img
                    src={article.imageUrl}
                    alt={`Fiona Ross - ${article.title}`}
                  />
                </div>

                <div>
                  <p>{article.copy}</p>
                  <p><a href={article.externalLink} target='_blank'>{article.externalLink}</a></p>
                </div>

              </div>

            </div>

          </div>
        )}
      </article>
    )
  }
}

Article.propTypes = {
  onDeleteEntity: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  onSetSelectedJournalismArticle: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleJournalismArticle(id),
  onDeleteEntity: (id) => deleteJournalismArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedJournalismArticle(),
  onSetSelectedJournalismArticle: (article) => setSelectedJournalismArticle(article)
};

const mapStateToProps = (state, props) => ({
  article: selectSelectedJournalismArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
