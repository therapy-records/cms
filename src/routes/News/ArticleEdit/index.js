import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  editNews
  // editNewsQueue
} from '../../../reducers/news';
import {
  destroySelectedNewsArticle,
  fetchSingleNewsArticle
} from '../../../reducers/newsArticle';
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
      promiseError,
      location
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


        {promiseError &&
          <p>error updating news article :( {promiseError.message}</p>
        }

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
            onSubmitForm={() => this.props.onEditArticle(article)}
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
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  onEditArticle: (article) => editNews(article),
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onDestroyArticle: () => destroySelectedNewsArticle(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
