import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import NewsArticleForm from '../../../../components/NewsArticleForm'

class ArticleCreate extends React.Component {
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
      <div>
        {promiseLoading &&
          <p>loading...</p>
        }
        {promiseError &&
          <p>error posting article :( {promiseError.message}</p>
        }
        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully posted! <br /><br />🚀</h2>
            <Link to='news' className='news-link'>Go to news</Link>
          </div>
        }
        {!promiseLoading && !promiseSuccess &&
          <NewsArticleForm
            onSubmitForm={this.props.onPostArticle}
            onSubmitFormQueue={this.props.onPostArticleQueue}
            location={location}
          />
        }
      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostArticle: PropTypes.func.isRequired,
  onPostArticleQueue: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.object,
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

export default ArticleCreate
