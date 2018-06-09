import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  destroySelectedOtherWorkArticle,
  fetchSingleOtherWorkArticle
} from '../../../reducers/otherWorkArticle';
import { editOtherWork } from '../../../reducers/otherWork';
import { selectSelectedOtherWorkArticle } from '../../../selectors/otherWork';
import OtherWorkArticleForm from '../../../components/OtherWorkArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

class ArticleEdit extends React.Component {
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
        {promiseLoading &&
          <LoadingSpinner />
        }

        {promiseError &&
          <p>error updating other-work article :( {promiseError.message}</p>
        }
        {(!promiseLoading && promiseSuccess) &&
          <div>
            <h2>Successfully updated! <br /><br />🚀</h2>
            <Link to='other-work'>Go to other work</Link>
          </div>
        }
        {!promiseLoading && !promiseSuccess &&
          <OtherWorkArticleForm
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
  onDestroyArticle: PropTypes.func.isRequired,
  onFetchArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  onEditArticle: (article) => editOtherWork(article),
  onFetchArticle: (id) => fetchSingleOtherWorkArticle(id),
  onDestroyArticle: () => destroySelectedOtherWorkArticle(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state, props) => ({
  article: selectSelectedOtherWorkArticle(state),
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  promiseError: state.uiState.promiseError,
  state: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit)
