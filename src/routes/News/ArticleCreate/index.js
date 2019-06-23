import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postNews } from '../../../reducers/news';
import { addNewsArticleSection } from '../../../reducers/newsArticle';
import { resetPromiseState } from '../../../reducers/uiState';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleCreate extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      location,
      promiseLoading,
      promiseSuccess,
      onPostArticle,
      onAddArticleSection
    } = this.props;

    return (
      <div className='container'>

        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully created! <small>🚀</small></h2>
            <div className='inline-flex'>
              <Link to='/news' className='btn'>Go to news</Link>
              <Link to='/news/create'>Create another article</Link>
            </div>
          </div>
        }

        {!promiseLoading && !promiseSuccess &&
          <NewsArticleForm
            onSubmitForm={onPostArticle}
            onAddArticleSection={onAddArticleSection}
            location={location}
          />
        }
      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostArticle: PropTypes.func.isRequired,
  onAddArticleSection: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onPostArticle: () => postNews(),
  onAddArticleSection: article => addNewsArticleSection(article),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: selectUiStateLoading(state),
  promiseSuccess: selectUiStateSuccess(state),
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)
