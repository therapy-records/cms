import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { postNews, postNewsQueue } from '../../../reducers/news';
import { postNews } from '../../../reducers/news';
import { resetPromiseState } from '../../../reducers/uiState';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

export class ArticleCreate extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      promiseLoading,
      promiseSuccess,
      promiseError,
      location
    } = this.props;

    return (
      <div className='container'>
        {promiseLoading &&
          <LoadingSpinner />
        }
        {promiseError &&
          <p>error posting article :( {promiseError.message}</p>
        }
        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully posted! <br /><br />🚀</h2>
            <Link to='/news'>Go to news</Link>
          </div>
        }

        {/* onSubmitFormQueue={this.props.onPostArticleQueue} */}

        {!promiseLoading && !promiseSuccess &&
          <NewsArticleForm
            onSubmitForm={this.props.onPostArticle}
            location={location}
          />
        }
      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostArticle: PropTypes.func.isRequired,
  // onPostArticleQueue: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.object,
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onPostArticle: () => postNews(),
  // onPostArticleQueue: () => postNewsQueue(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess,
  location: state.location
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate)
