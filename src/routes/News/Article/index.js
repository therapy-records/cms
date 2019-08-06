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
  destroySelectedNewsArticle
} from '../../../actions/newsArticle';
import ArticleHeader from '../../../components/ArticleHeader';
import LoadingSpinner from '../../../components/LoadingSpinner';
import redirect from '../../../utils/redirect';

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

            <ArticleHeader
              baseUrl='/news'
              article={article}
              onDeleteArticle={() => onDeleteArticle(article._id)}
              promiseLoading={promiseLoading}
              showEditButton
              showDeleteButton
            />

            <ul className='row-large row-alternating-columns'>
              {article.sections.map((section, index) => {
                const hasImages = section.images.length > 0;
                const hasCopy = section.copy;
                const hasCopyAndImages = (hasCopy && hasImages);

                return (
                  <li
                    key={index}
                    className={hasCopyAndImages ? 'cols-container' : ''}
                  >

                    {hasImages && 
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
                    }

                    {hasCopy &&
                      <div>
                        <div dangerouslySetInnerHTML={this.renderHtml(section.copy)} />
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

