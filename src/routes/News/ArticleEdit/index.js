import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../actions/uiState';
import { editNews, editNewsSuccess } from '../../../actions/news';
import {
  destroySelectedNewsArticle,
  fetchSingleNewsArticle
} from '../../../actions/newsArticle';
import {
  selectSelectedNewsArticle,
  selectNewsEditSuccess
} from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import NewsForm from '../../../components/NewsForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SuccessMessage from '../../../components/FormElements/SuccessMessage';
import redirect from '../../../utils/redirect';

export class ArticleEdit extends React.Component {
  constructor() {
    super();
    this.handleOnEditArticle = this.handleOnEditArticle.bind(this);
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
    const { match } = this.props;
    if (!match.params.id) {
      this.props.onDestroyArticle();
    }
    this.props.onResetEditSuccess();
  }

  componentDidMount() {
    const { article, match } = this.props;
    const paramsId = match.params.id;
    if (!article || !article._id) {
      this.props.onFetchArticle(paramsId);
    }
  }

  renderHtml(data) {
    return { __html: data }
  }

  handleOnEditArticle() {
    const {
      article,
      onEditArticle
    } = this.props;
    onEditArticle(article);
  }

  render() {
    const {
      article,
      promiseLoading,
      promiseSuccess,
      editSuccess,
      location
    } = this.props;

    if (article && article.isDeleted) {
      redirect.redirectHistory(this.props.history, '/news');
    }

    if (!article.isDeleted && !article._id) {
      return null;
    }

    return (
      <article className='container'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {(!promiseLoading && promiseSuccess && editSuccess) &&
          <SuccessMessage
            baseUrl='/news'
            copy={{
              homeLink: 'Go to News'
            }}
          />
        }

        {(article && article.isDeleted) &&
          <div>
            <h2>Successfully deleted! <small>🚀</small></h2>
            <p>Redirecting...</p>
          </div>
        }

        {(!promiseLoading && !editSuccess) &&
         (!promiseLoading && !article.isDeleted) &&
          <NewsForm
            articleId={article._id}
            onSubmitForm={this.handleOnEditArticle}
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
  onResetEditSuccess: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  editSuccess: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object
}

const mapDispatchToProps = {
  onEditArticle: (article) => editNews(article),
  onFetchArticle: (id) => fetchSingleNewsArticle(id),
  onDestroyArticle: () => destroySelectedNewsArticle(),
  onResetEditSuccess: () => editNewsSuccess(false),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedNewsArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  editSuccess: selectNewsEditSuccess(state),
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
