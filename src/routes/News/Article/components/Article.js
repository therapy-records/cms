import React from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import moment from 'moment';
import ArticleDeleteModal from './ArticleDeleteModal';

class Article extends React.Component {

  state = {
    isShowingModal: false
  }

  handleModalOpen = () => this.setState({ isShowingModal: true })
  handleModalClose = () => this.setState({ isShowingModal: false })

  componentWillMount() {
    const propsArticle = this.props.article;
    const paramsId = this.props.params.id;
    const noArticle = !propsArticle ||
                      !propsArticle._id ||
                      !paramsId;

    const articleMatches = !noArticle && propsArticle._id === paramsId;
    if (noArticle || !articleMatches) {
      this.props.onFetchSingleNewsArticle(paramsId);
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
    this.props.onDestroyArticle();
  }

  renderHtml(data) {
    return { __html: data }
  }

  handleOnDeleteArticle(article) {
    if (article.scheduledTime) {
      this.props.onDeleteScheduledArticle(article._id)
    } else {
      this.props.onDeleteArticle(article._id)
    }
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
    const articleHasImages = article && articleHasMainImage || articleHasMiniGalleryImages;

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
        browserHistory.push('/news');
      }, 1000)
    }

    return (
      <article>
        {promiseLoading &&
          <h1>loading...</h1>
        }

        {article && article.isDeleted &&
          <div style={{ textAlign: 'center' }}>
            <h4>Successfully deleted!</h4>
            <p>redirecting...</p>
          </div>
        }

        {(article && article.title && !article.isDeleted) && (
          <div className='article-flex-root'>

            <div className='article-col-1'>
              <h2>{article.title}</h2>
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

              {article.ticketsLink && <a href={article.ticketsLink} target='_blank'>Get tickets</a>}
              <br />
              {article.venueLink && <a href={article.venueLink} target='_blank'>Venue</a>}
              <br />

              {article.videoEmbed &&
                <iframe
                  width='560'
                  src={article.videoEmbed}
                  frameBorder='0'
                  allowFullscreen
                />
              }

              <br />

              {articleHasMiniGalleryImages ?
                <div>
                  <h3>Mini gallery images</h3>
                  <ul className='article-gallery-flex-root'>
                    {article.miniGalleryImages.map((i) => (
                      <li key={i} className='article-col-50 no-list-style article-gallery-item'>
                        <img src={i} />
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

            <div className='article-col-2'>
              <div className='article-summary-box'>
                <div className='article-summary-box-inner'>
                  {/* <p><a href={`http://fionaross.co.uk/news/${article._id}`}>View live article</a></p> */}
                  <p><a href={`http://fionaross.co.uk/news`} target='blank'>View live article</a></p>
                  <p>Created {moment(article.createdAt).fromNow()}
                    <small>{moment(article.createdAt).format('DD/mm/YYYY')}</small>
                  </p>
                  {article.editedAt &&
                    <p>Last modified {moment(article.editedAt).fromNow()}
                      <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
                    </p>
                  }

                  <Link
                    to={`/news/${article._id}/edit`}
                    className='btn btn-edit'
                  >Edit article
                  </Link>

                  <button
                    className='btn'
                    onClick={this.handleModalOpen}
                    style={{ width: 'auto', background: 'darkred', color: '#fff' }}>Delete article
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {promiseError &&
          <p>error fetching news article :(</p>
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
  onDeleteArticle: PropTypes.func.isRequired,
  onDeleteScheduledArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseError: PropTypes.bool,
  onFetchSingleNewsArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  params: PropTypes.object
}

export default Article
