import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  destroySelectedJournalismArticle,
  fetchSingleJournalismArticle
} from '../../../reducers/journalismArticle';
import { editJournalism } from '../../../reducers/journalism';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import JournalismArticleForm from '../../../components/JournalismArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleEdit extends React.Component {
  constructor() {
    super();
    this.handleOnEditArticle = this.handleOnEditArticle.bind(this);
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
    this.props.onDestroyArticle();
  }
  
  componentWillMount() {
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

        {!promiseLoading && (promiseSuccess && article.editSuccess) &&
          <div>
            <h2>Successfully updated! <small>🚀</small></h2>
            <Link to='/journalism' className='btn'>Go to Journalism</Link>
          </div>
        }

        {(!promiseLoading && !article.editSuccess) &&
          <JournalismArticleForm
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
  onDestroyArticle: PropTypes.func.isRequired,
  onFetchArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  onEditArticle: (article) => editJournalism(article),
  onFetchArticle: (id) => fetchSingleJournalismArticle(id),
  onDestroyArticle: () => destroySelectedJournalismArticle(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedJournalismArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
