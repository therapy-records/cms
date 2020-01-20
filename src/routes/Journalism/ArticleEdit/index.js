import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../actions/uiState';
import {
  destroySelectedJournalismArticle,
  fetchSingleJournalismArticle
} from '../../../actions/journalismArticle';
import {
  editJournalism,
  editJournalismSuccess
} from '../../../actions/journalism';
import {
  selectSelectedJournalismArticle,
  selectJournalismEditSuccess
} from '../../../selectors/journalism';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import SuccessMessage from '../../../components/FormElements/SuccessMessage';
import JournalismForm from '../../../components/JournalismForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
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

    // todo: move to will/did update
    if (article && article.isDeleted) {
      redirect.redirectHistory(this.props.history, '/journalism');
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

        {!promiseLoading && (promiseSuccess && editSuccess) &&
          <SuccessMessage
            baseUrl='/journalism'
            copy={{
              homeLink: 'Go to Journalism'
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
  onResetEditSuccess: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  editSuccess: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedJournalismArticle(state),
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  editSuccess: selectJournalismEditSuccess(state),
  state: state.location
});

const mapDispatchToProps = {
  onEditArticle: (article) => editJournalism(article),
  onFetchArticle: (id) => fetchSingleJournalismArticle(id),
  onDestroyArticle: () => destroySelectedJournalismArticle(),
  onResetEditSuccess: () => editJournalismSuccess(false),
  resetPromiseState: () => resetPromiseState()
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
