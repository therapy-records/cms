import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { resetPromiseState } from '../../../reducers/uiState';
import { fetchNewsArticles } from '../../../reducers/news';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import {
  deleteNewsArticle,
  fetchSingleNewsArticle,
  destroySelectedNewsArticle
} from '../../../reducers/newsArticle';
import ArticleDeleteModal from '../../../components/ArticleDeleteModal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { getArticlesFirstImageUrl } from '../../../utils/news';

export class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleOnDeleteArticle = this.handleOnDeleteArticle.bind(this);
  }

  handleModalOpen() {
    this.setState({ isShowingModal: true })
  }

  handleModalClose(){
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

  handleOnDeleteArticle() {
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
          pathname: '/news'
        });
      }, 3000);
    }

    const articleHasAnImage = getArticlesFirstImageUrl(article);

    return (
      <article className='container article'>

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
                {article.editedAt &&
                  <p>Last modified {moment(article.editedAt).fromNow()}
                    <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
                  </p>
                }
              </div>

              <div className='action-btns'>
                <button
                  className='btn btn-danger'
                  onClick={this.handleModalOpen}
                >Delete
                </button>
                <Link
                  to={`/news/${article._id}/edit`}
                  className='btn btn-edit'
                >Edit
                </Link>
              </div>
            </div>

            <ul className='row-large row-alternating-columns'>
              {articleHasAnImage ?
                article.sections.map((section, index) => (
                    <li
                      key={index}
                      className='cols-container'
                    >

                      <div>
                        <ul>
                          {section.images.map(image => {
                            return image.url && (
                              <img
                                key={image.url}
                                src={image.url}
                                alt='Fiona Ross'
                              />
                            )
                          })}
                        </ul>
                      </div>

                      <div>
                        <div dangerouslySetInnerHTML={this.renderHtml(section.copy)} />
                      </div>

                    </li>
                  )
                )
              : (
                  <div>
                    <div dangerouslySetInnerHTML={this.renderHtml(article.sections[0].copy)} />
                  </div>
              )}
            </ul>

          </div>
        )}

        {(!promiseLoading && this.state.isShowingModal) &&
          <ArticleDeleteModal
            handleModalClose={this.handleModalClose}
            onDeleteArticle={this.handleOnDeleteArticle}
          />
        }
      </article>
    )
  }
}

Article.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  params: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onFetchNewsArticles: () => fetchNewsArticles(),
  onDeleteArticle: (id) => deleteNewsArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedNewsArticle()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)

