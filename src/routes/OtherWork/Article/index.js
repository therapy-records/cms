import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { resetPromiseState } from '../../../reducers/uiState';
import { selectSelectedOtherWorkArticle } from '../../../selectors/otherWork';
import {
  deleteOtherWorkArticle,
  fetchSingleOtherWorkArticle,
  destroySelectedOtherWorkArticle
} from '../../../reducers/otherWorkArticle';
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';
import PromiseError from '../../../components/PromiseError';

export class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
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
    // TODO: fix
    // if (!this.props.location.pathname.includes('/edit')) {
    //   this.props.onDestroyArticle();
    // }
  }

  renderHtml(data) {
    return { __html: data }
  }

  handleOnDeleteArticle(article) {
    this.props.onDeleteArticle(article._id)
  }

  handleModalOnDelete() {
    this.handleOnDeleteArticle(this.props.article);
    this.handleModalClose();
  }

  render() {
    const {
      article,
      promiseLoading,
      promiseError
    } = this.props;

    if (article && article.isDeleted) {
      setTimeout(() => {
        this.props.history.push({
          pathname: '/other-work'
        });
      }, 1000)
    }

    return (
      <article className='container article article-other-work'>
        {/*promiseLoading &&
          <LoadingSpinner fullScreen />
        */}
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {article && article.isDeleted &&
          <div style={{ textAlign: 'center' }}>
            <h4>Successfully deleted!</h4>
            <p>redirecting...</p>
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
                  to={`/other-work/${article._id}/edit`}
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


            {article.mainImageUrl &&
              <div className='row-large img-container'>
                <img
                  src={article.mainImageUrl}
                  alt={`Fiona Ross - ${article.title}`}
                />
              </div>
            }

            <p>Released: {moment(article.releaseDate).fromNow()}</p>

          </div>
        )}

        {promiseError &&
          <PromiseError message='fetching other-work article' />
        }

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
  promiseError: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  params: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleOtherWorkArticle(id),
  onDeleteArticle: (id) => deleteOtherWorkArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedOtherWorkArticle()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedOtherWorkArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)
