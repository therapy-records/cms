import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import NewsPostForm  from '../../../../components/NewsPostForm'

class ArticleCreate extends React.Component {
  
  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  render() {
    const { 
      newsPost,
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
          <p>error posting :( {promiseError.message}</p>
        }
        {!promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully posted! <br/><br/>🚀</h2>
            <Link to='news' className='news-link'>Go to news</Link>
          </div>
        }
        {!promiseLoading && !promiseSuccess && 
          <NewsPostForm onSubmit={this.props.onPostNews} />
        }
        
      </div>
    )
  }
}

ArticleCreate.propTypes = {
  onPostNews: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.object
}

export default ArticleCreate