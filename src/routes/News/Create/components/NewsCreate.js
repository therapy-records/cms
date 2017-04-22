import React from 'react'
import { Link } from 'react-router'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsCreate extends React.Component {
  render() {
    const { 
      newsPost,
      promiseLoading,
      promiseSuccess
    } = this.props;

    return (
      <div>
        {promiseLoading && 
          <p>loading...</p>
        }
        {/*!promiseLoading && promiseSuccess ? (
          <div>
            <h2>Successfully posted! <br/><br/>🚀</h2>
            <Link to='news' className='news-link'>Go to news</Link>
          </div>
        */}
        {!promiseLoading && 
          <NewsPostForm onSubmit={this.props.onPostNews} />
        }
        
      </div>
    )
  }
}

NewsCreate.propTypes = {
  onPostNews: React.PropTypes.func.isRequired,
  promiseLoading: React.PropTypes.bool,
  promiseSuccess: React.PropTypes.bool
}

export default NewsCreate
