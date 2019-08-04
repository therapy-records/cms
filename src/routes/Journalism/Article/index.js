import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { resetPromiseState } from '../../../actions/uiState';
import {
  deleteJournalismArticle,
  fetchSingleJournalismArticle,
  destroySelectedJournalismArticle
} from '../../../actions/journalismArticle';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import ArticleHeader from '../../../components/ArticleHeader';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class Article extends React.Component {
  componentWillMount() {
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

  componentWillUnmount() {
    this.props.resetPromiseState();
    this.props.onDestroyArticle();
  }

  renderHtml(data) {
    return { __html: data }
  }

  render() {
    const {
      article,
      promiseLoading,
      onDeleteArticle
    } = this.props;

    // todo: move to will/did update
    if (article && article.isDeleted) {
      setTimeout(() => {
        this.props.history.push({
          pathname: '/journalism'
        });
      }, 3000)
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

            <ArticleHeader
              baseUrl='/journalism'
              article={article}
              onDeleteArticle={() => onDeleteArticle(article._id)}
              promiseLoading={promiseLoading}
            />

            <div className='row-large'>
              <p>{article.copy}</p>
              <p><a href={article.externalLink} target='_blank'>{article.externalLink}</a></p>
            </div>

            {article.imageUrl &&
              <div className='row-large img-container'>
                <img
                  src={article.imageUrl}
                  alt={`Fiona Ross - ${article.title}`}
                />
              </div>
            }

            <p>Released: {moment(article.releaseDate).fromNow()}</p>

          </div>
        )}
      </article>
    )
  }
}

Article.propTypes = {
  onDeleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  params: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleJournalismArticle(id),
  onDeleteArticle: (id) => deleteJournalismArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedJournalismArticle()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedJournalismArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
