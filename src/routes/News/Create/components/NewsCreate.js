import React from 'react'
import { Link } from 'react-router'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsCreate extends React.Component {
  
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

NewsCreate.propTypes = {
  onPostNews: React.PropTypes.func.isRequired,
  promiseLoading: React.PropTypes.bool,
  promiseSuccess: React.PropTypes.bool,
  promiseError: React.PropTypes.object
}

export default NewsCreate
