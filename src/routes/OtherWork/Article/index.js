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

class Article extends React.Component {

  state = {
    isShowingModal: false
  }

  handleModalOpen = () => this.setState({ isShowingModal: true })
  handleModalClose = () => this.setState({ isShowingModal: false })

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

  render() {
    const {
      article,
      promiseLoading,
      promiseError
    } = this.props;

    if (article && article.isDeleted) {
      console.log('TODO: redirect');
      setTimeout(() => {
        this.props.history.push({
          pathname: '/other-work'
        });
      }, 1000)
    }

    return (
      <article className='container article'>
        {promiseLoading &&
          <LoadingSpinner />
        }

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

            <p>{article.copy}</p>

            <br />

            <p>Release date: {moment(article.releaseDate).fromNow()}</p>
            <p>Links to: <a href={article.externalLink} target='_blank'>{article.externalLink}</a></p>

            <div className='cols-container'>

              {article.mainImageUrl &&
                <div>
                  <img
                    src={article.mainImageUrl}
                    alt={`Fiona Ross - ${article.title}`}
                  />
                </div>
              }

            </div>
          </div>
        )}

        {promiseError &&
          <p>error fetching other-work article :(</p>
        }

        {(!promiseLoading && this.state.isShowingModal) &&
          <ArticleDeleteModal
            handleModalClose={this.handleModalClose}
            onDeleteArticle={() => { this.handleOnDeleteArticle(article); this.handleModalClose() }}
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
  params: PropTypes.object
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
