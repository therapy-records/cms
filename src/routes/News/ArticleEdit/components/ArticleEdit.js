import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import NewsArticleForm from '../../../../components/NewsArticleForm'

class ArticleEdit extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
    this.props.onDestroyArticle();
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
      <article>
        {promiseLoading &&
          <p>loading...</p>
        }

        {promiseError &&
          <p>error updating news article :( {promiseError.message}</p>
        }
        {(!promiseLoading && promiseSuccess) &&
          <div>
            <h2>Successfully updated! <br /><br />🚀</h2>
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
            <NewsArticleForm
              onSubmitForm={() => this.props.onEditArticle(article)}
              onSubmitFormQueue={() => this.props.onEditArticleQueue(article)}
              location={location}
            />
          </div>
        }
      </article>
    )
  }
}

ArticleEdit.propTypes = {
  onEditArticle: PropTypes.func.isRequired,
  onEditArticleQueue: PropTypes.func.isRequired,
  onDestroyArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default ArticleEdit
