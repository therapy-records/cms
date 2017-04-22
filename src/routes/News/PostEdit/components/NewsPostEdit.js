import React from 'react'
import { Link } from 'react-router'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsPostEdit extends React.Component {

  componentWillMount(){
    if (!this.props.newsPosts) {
      this.props.onFetchNews();
    }
  }

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { 
      newsPost,
      promiseLoading,
      promiseSuccess,
      promiseError
    } = this.props;
    if (!newsPost) {
      return null;
    }

    return (
      <article>
        {promiseLoading &&
          <h1>loading...</h1>
        }
        {/*
          !promiseLoading && promiseSuccess &&
          <div>
            <h2>Successfully posted! <br/><br/>🚀</h2>
            <Link to='news' className='news-link'>Go to news</Link>
          </div>
        */}
        {promiseError &&
          <p>error fetching news post :(</p>
        }
        {promiseSuccess &&
          <div>
            <p>editing <br />{newsPost.title}</p>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <NewsPostForm 
              post={newsPost}
              onSubmit={() => this.props.onPostForm(newsPost)}
            />
          </div>
        }
      </article>
    )
  }
}

NewsPostEdit.propTypes = {
  onFetchNews: React.PropTypes.func.isRequired,
  onPostForm: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired,
  promiseLoading: React.PropTypes.bool,
  promiseSuccess: React.PropTypes.bool,
  promiseError: React.PropTypes.bool,
  resetPromiseState: React.PropTypes.func.isRequired
}

export default NewsPostEdit
