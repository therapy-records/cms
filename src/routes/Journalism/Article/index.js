import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  deleteJournalismArticle,
  fetchSingleJournalismArticle,
  destroySelectedJournalismArticle
} from '../../../reducers/journalismArticle';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';

export class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOnDelete = this.handleModalOnDelete.bind(this);
  }

  handleModalOpen() {
    this.setState({ isShowingModal: true })
  }

  handleModalClose() {
    this.setState({ isShowingModal: false })
  }

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

  handleModalOnDelete() {
    this.props.onDeleteArticle(this.props.article._id)
    this.handleModalClose();
  }

  render() {
    const {
      article,
      promiseLoading
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
          active={promiseLoading}
          fullScreen
        />

        {article && article.isDeleted &&
          <div>
            <h2>Successfully deleted! <small>🚀</small></h2>
            <p>Redirecting...</p>
          </div>
        }

        {(article && article.title && !article.isDeleted) && (
          <div>

            <div className='heading-action-btns'>
              <div className='heading-with-btn'>
                <h2>{article.title}</h2>
                <p className='small-tab'>{moment(article.createdAt).fromNow()}</p>
              </div>

              <div className='action-btns'>
                <button
                  className='btn btn-danger'
                  onClick={this.handleModalOpen}
                >Delete
                </button>
                <Link
                  to={`/journalism/${article._id}/edit`}
                  className='btn btn-edit'
                >Edit</Link>
              </div>
            </div>

            {article.editedAt &&
              <p>Last modified {moment(article.editedAt).fromNow()}
                <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
              </p>
            }

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

        {(!promiseLoading && this.state.isShowingModal) &&
          <ArticleDeleteModal
            handleModalClose={this.handleModalClose}
            onDeleteArticle={this.handleModalOnDelete}
          />
        }
      </article>
    )
  }
}

Article.propTypes = {
  // location: PropTypes.object.isRequired,
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
  promiseSuccess: selectUiStateSuccess(state),
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
