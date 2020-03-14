import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../actions/uiState';
import { fetchNewsArticles } from '../../../actions/news';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import {
  deleteNewsArticle,
  fetchSingleNewsArticle,
  destroySelectedNewsArticle,
  setSelectedNewsArticle
} from '../../../actions/newsArticle';
import EntityPageHeader from '../../../components/EntityPageHeader';
import LoadingSpinner from '../../../components/LoadingSpinner';
import redirect from '../../../utils/redirect';
import entityHeading from '../../../utils/entityHeading';

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
      this.props.onSetSelectedNewsArticle(article);
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

    // todo: move to will/did update
    if (article && article.isDeleted) {
      redirect.redirectHistory(this.props.history, '/news');
    }

    return (
      <article className='container article'>

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
              baseUrl='/news'
              article={article}
              heading={entityHeading(article)}
              onDeleteEntity={() => onDeleteEntity(article._id)}
              promiseLoading={promiseLoading}
              showEditButton
              showDeleteButton
              longHeading
            />

            <ul className='row-large row-alternating-columns'>
              {article.sections.map((section, index) => {
                const hasImages = section.images.length > 0;
                const hasMultipleImages = section.images.length > 1;
                const hasCopy = section.copy;
                const hasVideo = section.videoEmbed

                return (
                  <li
                    key={index}
                    className={(hasMultipleImages || hasVideo) ? 'single-column-layout' : ''}
                  >
                  
                    {hasCopy &&
                      <div
                        dangerouslySetInnerHTML={this.renderHtml(section.copy)}
                      />
                    }

                    {hasImages && 
                      <div>
                        <ul className='images'>
                          {section.images.map(image => {
                            return image.url && (
                              <li key={image.url}>
                                <img
                                  src={image.url}
                                  alt='Fiona Ross'
                                />
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    }

                    {hasVideo &&
                      <div>
                        <div dangerouslySetInnerHTML={this.renderHtml(section.videoEmbed)} />
                      </div>
                    }

                  </li>
                )
              })}
            </ul>

          </div>
        )}

      </article>
    )
  }
}

Article.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onDeleteEntity: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  onFetchArticle: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  onSetSelectedNewsArticle: PropTypes.func.isRequired,
  params: PropTypes.object
}

const mapDispatchToProps = {
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onFetchNewsArticles: () => fetchNewsArticles(),
  onDeleteEntity: (id) => deleteNewsArticle(id),
  resetPromiseState: () => resetPromiseState(),
  onDestroyArticle: () => destroySelectedNewsArticle(),
  onSetSelectedNewsArticle: (article) => setSelectedNewsArticle(article)
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)

