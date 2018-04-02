import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class ArticleCreate extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      promiseLoading,
      promiseSuccess,
      promiseError
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
            <Link to='/other-work' className='news-link'>Go to Other Work</Link>
          </div>
        }

        {!promiseLoading && !promiseSuccess &&
          <p>form goes here</p>
        }

      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostArticle: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  location: PropTypes.object,
  resetPromiseState: PropTypes.func
}

export default ArticleCreate
