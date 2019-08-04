import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../actions/uiState';
import {
  destroySelectedJournalismArticle,
  fetchSingleJournalismArticle
} from '../../../actions/journalismArticle';
import { editJournalism } from '../../../actions/journalism';
import { selectSelectedJournalismArticle } from '../../../selectors/journalism';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import JournalismForm from '../../../components/JournalismForm';
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

    // todo: move to will/did update
    if (article && article.isDeleted) {
      setTimeout(() => {
        this.props.history.push({
          pathname: '/journalism'
        });
      }, 3000)
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

        {!promiseLoading && (promiseSuccess && article.editSuccess) &&
          <div>
            <h2>Successfully updated! <small>🚀</small></h2>
            <Link to='/journalism' className='btn'>Go to Journalism</Link>
          </div>
        }

        {(article && article.isDeleted) &&
          <div>
            <h2>Successfully deleted! <small>🚀</small></h2>
            <p>Redirecting...</p>
          </div>
        }

        {(!promiseLoading && !article.editSuccess) &&
         (!promiseLoading && !article.isDeleted) &&
          <JournalismForm
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
  onDestroyArticle: PropTypes.func.isRequired,
  onFetchArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedJournalismArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  state: state.location
});

const mapDispatchToProps = {
  onEditArticle: (article) => editJournalism(article),
  onFetchArticle: (id) => fetchSingleJournalismArticle(id),
  onDestroyArticle: () => destroySelectedJournalismArticle(),
  resetPromiseState: () => resetPromiseState()
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
