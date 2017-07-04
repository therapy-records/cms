import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import moment from 'moment';
import './Article.scss'
import ArticleDeleteModal from './ArticleDeleteModal';

class Article extends React.Component {

  state = {
    isShowingModal: false
  }

  handleModalOpen = () => this.setState({ isShowingModal: true })
  handleModalClose = () => this.setState({ isShowingModal: false })

  componentWillMount() {
    if (!this.props.newsArticles) {
      this.props.onFetchNews();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
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
    let deletedState = false;

    // todo: fix me so that promise success for deletion is seen via
    // state.uiState. or similar.
    // this logic is based on previous approach of 'selecteNewsPost' in store.

    // if (article.message && article.message === 'Post deleted') {
    //   deletedState = true;
    //   setTimeout(() => {
    //     browserHistory.push('/news');
    //   }, 1000)
    // }

    return (
      <article>
        {promiseLoading &&
          <h1>loading...</h1>
        }

        {(promiseSuccess && article && article.title) &&
          <div className='flex-root'>

            <div className='col-1'>
              <h2>{article.title}</h2>
              <div dangerouslySetInnerHTML={this.renderHtml(article.bodyMain)} />
              <br />
              <img src={article.mainImageUrl} />
              <br />
              <br />

              {article.miniGalleryImages.length ?
                <div>
                  <h3>Mini gallery images</h3>
                  <ul className='gallery-flex-root'>
                    {article.miniGalleryImages.map((i) => (
                      <li key={i} className='col-50 no-list-style gallery-item'>
                        <img src={i} />
                      </li>
                    ))}
                  </ul>
                </div>
              : null}

            </div>

            <div className='col-2'>
              <div className='summary-box'>
                <div className='summary-box-inner'>
                  {/* <p><a href={`http://fionaross.co.uk/news/${article._id}`}>View live post</a></p> */}
                  <p><a href={`http://fionaross.co.uk/news`} target='blank'>View live post</a></p>
                  <p>Created {moment(article.createdAt).fromNow()}
                    <small>{moment(article.createdAt).format('DD/mm/YYYY')}</small>
                  </p>
                  {article.editedAt &&
                    <p>Last modified {moment(article.editedAt).fromNow()}
                      <small>{moment(article.editedAt).format('DD/mm/YYYY')}</small>
                    </p>
                  }

                  <Link to={`/news/${article._id}/edit`} className='btn'>Edit post</Link>

                  <button 
                    className='btn' 
                    onClick={this.handleModalOpen} 
                    style={{ width: 'auto', background: 'darkred', color: '#fff' }}>Delete post
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        {promiseError &&
          <p>error fetching news post :(</p>
        }

        {this.state.isShowingModal &&
          <ArticleDeleteModal deleted={deletedState} />
        }
      </article>
    )
  }
}

Article.propTypes = {
  onDeleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  promiseLoading: PropTypes.bool,
  promiseSuccess: PropTypes.bool,
  promiseError: PropTypes.bool,
  resetPromiseState: PropTypes.func.isRequired,
  newsArticles: PropTypes.func,
  onFetchNews: PropTypes.func.isRequired
}

export default Article
