import React from 'react'
import { Link } from 'react-router'
import NewsPostForm  from '../../../../components/NewsPostForm'

class ArticleEdit extends React.Component {

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { 
      article,
      promiseLoading,
      promiseSuccess,
      promiseError
    } = this.props;

    if (!article || !article.title) {
      return null;
    }

    return (
      <article>
        {promiseLoading &&
          <h1>loading...</h1>
        }

        {promiseError &&
          <p>error updating news post :( {promiseError.message}</p>
        }
        {(!promiseLoading && promiseSuccess) &&
          <div>
            <h2>Successfully updated! <br/><br/>🚀</h2>
            <Link to='news' className='news-link'>Go to news</Link>
          </div>
        }
        {!promiseLoading && !promiseSuccess &&
          <div>
            <p>editing <br />{article.title}</p>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <NewsPostForm 
              post={article}
              onSubmit={() => this.props.onPostForm(article)}
            />
          </div>
        }
      </article>
    )
  }
}

ArticleEdit.propTypes = {
  onFetchNews: React.PropTypes.func.isRequired,
  onPostForm: React.PropTypes.func.isRequired,
  article: React.PropTypes.object.isRequired,
  promiseLoading: React.PropTypes.bool,
  promiseSuccess: React.PropTypes.bool,
  promiseError: React.PropTypes.bool,
  resetPromiseState: React.PropTypes.func.isRequired
}

export default ArticleEdit
