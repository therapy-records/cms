import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../reducers/uiState';
import {editNews} from '../../../reducers/news';
import {
  destroySelectedNewsArticle,
  fetchSingleNewsArticle,
  addNewsArticleSection
} from '../../../reducers/newsArticle';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleEdit extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
    this.props.onDestroyArticle();
  }

  componentWillMount() {
    const {article, match} = this.props;
    const paramsId = match.params.id;
    if (!article || !article._id) {
      this.props.onFetchArticle(paramsId);
    }
  }

  renderHtml(data) {
    return { __html: data }
  }

  render() {
    const {
      article,
      promiseLoading,
      promiseSuccess,
      location,
      onEditArticle,
      onAddArticleSection
    } = this.props;


    if (!article || !article.title) {
      return null;
    }

    return (
      <article className='container'>
        
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading && (promiseSuccess && article.editSuccess) &&
          <div>
            <h2>Successfully updated! <small>🚀</small></h2>
            <div className='inline-flex'>
              <Link to='/news'>Go to news</Link>
            </div>
          </div>
        }

        {(!promiseLoading && !article.editSuccess) &&
          <NewsArticleForm
            onSubmitForm={onEditArticle}
            onAddArticleSection={onAddArticleSection}
            location={location}
          />
        }
      </article>
    )
  }
}

ArticleEdit.propTypes = {
  onEditArticle: PropTypes.func.isRequired,
  onFetchArticle: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  onAddArticleSection: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  onEditArticle: (article) => editNews(article),
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onDestroyArticle: () => destroySelectedNewsArticle(),
  onAddArticleSection: article => addNewsArticleSection(article),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
