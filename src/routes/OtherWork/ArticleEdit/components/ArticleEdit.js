import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import OtherWorkArticleForm from 'components/OtherWorkArticleForm';

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
      promiseError
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
          <p>error updating other-work article :( {promiseError.message}</p>
        }
        {(!promiseLoading && promiseSuccess) &&
          <div>
            <h2>Successfully updated! <br /><br />🚀</h2>
            <Link to='other-work'>Go to other work</Link>
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
            <OtherWorkArticleForm
              onSubmitForm={() => this.props.onEditArticle(article)}
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
  onDestroyArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

export default ArticleEdit
