import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { resetPromiseState } from '../../../reducers/uiState';
import { fetchNewsArticles } from '../../../reducers/news';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  deleteNewsArticle,
  // deleteScheduledArticle,
  fetchSingleNewsArticle,
  destroySelectedNewsArticle
} from '../../../reducers/newsArticle';
import ArticleDeleteModal from '../../../components/ArticleDeleteModal';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class Article extends React.Component {

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
    if (!this.props.history.location.pathname.includes('/edit')) {
      this.props.onDestroyArticle();
    }
  }

  renderHtml(data) {
    return { __html: data }
  }

  handleOnDeleteArticle(article) {
    // if (article.scheduledTime) {
    //   this.props.onDeleteScheduledArticle(article._id)
    // } else {
    //   this.props.onDeleteArticle(article._id)
    // }
    this.props.onDeleteArticle(article._id)
    this.handleModalClose();
  }

  render() {
    const {
      article,
      promiseLoading,
      promiseError
    } = this.props;

    const articleHasMiniGalleryImages = article &&
                                        article.miniGalleryImages &&
                                        article.miniGalleryImages.length &&
                                        article.miniGalleryImages.length > 0;

    const articleHasHashtags = article &&
                               article.socialShare &&
                               article.socialShare.hashtags &&
                               article.socialShare.hashtags.length &&
                               article.socialShare.hashtags.length > 0;

    const articleHasMainImage = article && article.mainImage && article.mainImage.url;
    const articleHasImages = article && articleHasMainImage || articleHasMiniGalleryImages; // eslint-disable-line

    const articleImg = () => {
      if (!article) {
        return null;
      } else if (article.mainImage && article.mainImage.url) {
        return article.mainImage.url;
      } else if (articleHasMiniGalleryImages) {
        return article.miniGalleryImages[0];
      }
      return null;
    }

    if (article && article.isDeleted) {
      setTimeout(() => {
        this.props.history.push({
          pathname: '/news'
        });
      }, 1000)
    }

    return (
      <article className='container'>
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

            <h2>{article.title}</h2>

            <p>Created {moment(article.createdAt).fromNow()}</p>
            {article.editedAt &&
              <p>Last modified {moment(article.editedAt).fromNow()}
                <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
              </p>
            }

            <Link
              to={`/news/${article._id}/edit`}
              className='btn btn-edit'
            >Edit
            </Link>

            <button
              className='btn'
              onClick={this.handleModalOpen}
              style={{ background: 'darkred', color: '#fff' }}
            >Delete
            </button>
          
              <div dangerouslySetInnerHTML={this.renderHtml(article.bodyMain)} />

              <br />

              {article.quotes ?
                <div>
                  <ul>
                    {article.quotes.map((q) =>
                      <li key={q.author}>
                        <i>&quot;{q.copy}&quot;</i> - {q.author}
                      </li>
                    )}
                  </ul>
                </div>
              : null}

              <br />

              <div className='cols-container'>

                {articleHasImages ?
                  <div>
                    {article.mainImage && article.mainImage.externalLink ?
                      <a href={article.mainImage.externalLink}
                        target='_blank'>
                        <img
                          src={articleImg()}
                          alt={`Fiona Ross - ${article.title}`}
                        />
                      </a>
                    : <img
                        src={articleImg()}
                        alt={`Fiona Ross - ${article.title}`}
                      />}
                  </div>
                : null}

                {article.secondaryImageUrl &&
                  <div>
                    <img
                      src={article.secondaryImageUrl}
                      alt={`Fiona Ross - ${article.title}`}
                    />
                  </div>
                }

              </div>

              <br />
              <br />

              {article.ticketsLink && <a className='btn' href={article.ticketsLink} target='_blank'>Get tickets</a>}
              <br />
              {article.venueLink && <a className='btn' href={article.venueLink} target='_blank'>Venue</a>}
              <br />

              {article.videoEmbed &&
                <iframe
                  width='560'
                  src={article.videoEmbed}
                  title={`Video of ${article.title}`}
                  frameBorder='0'
                  allowFullScreen
                />
              }

              <br />

              {articleHasMiniGalleryImages ?
                <div>
                  <h3>Mini gallery images</h3>
                  <ul className='article-gallery-flex-root'>
                    {article.miniGalleryImages.map((i) => (
                      <li key={i} className='article-col-50 no-list-style article-gallery-item'>
                        <img src={i} alt='gallery shot' />
                      </li>
                    ))}
                  </ul>
                </div>
              : null}

              {articleHasHashtags ?
                <div>
                  <h3>Hashtags</h3>
                  <ul>
                    {article.socialShare.hashtags.map((h) =>
                      <li key={h}>{h}</li>
                    )}
                  </ul>
                </div>
              : null}

          </div>
        )}

        {promiseError &&
          <p>error fetching news article :(</p>
        }

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
  // onDeleteScheduledArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseError: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  params: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onFetchNewsArticles: () => fetchNewsArticles(),
  onDeleteArticle: (id) => deleteNewsArticle(id),
  // onDeleteScheduledArticle: (id) => deleteScheduledArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedNewsArticle()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)

