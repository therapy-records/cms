import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import moment from 'moment';

class OtherWorkHome extends React.Component {
  componentWillMount() {
    if (!this.props.articles ||
      !this.props.articles.length) {
      this.props.onFetchOtherWorkArticles();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  renderHtml(data) {
    return { __html: data }
  }

  handleButtonClick(postObj) {
    this.props.onSetSelectedNewsArticle(postObj);
  }

  renderArticle(p) {
    return (
      <li key={p._id} className='news-item'>
        <img src={p.mainImageUrl} />
        <div>
          <h3>
            <Link
              onClick={() => this.handleButtonClick(p)}
              to={`other-work/${p._id}`}
            >{p.title}
            </Link>
          </h3>

          <div dangerouslySetInnerHTML={this.renderHtml(p.copy)} />

          {p.releaseDate && <p className='small-tab'>Released: {moment(p.releaseDate).format('DD MMM YYYY')}</p>}
          {p.createdAt && <p className='small-tab'>Created: {moment(p.createdAt).fromNow()}</p>}
          <p>Links to: {p.externalLink}</p>

          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`other-work/${p._id}`}
            className='btn btn-sm'
          >
            View
          </Link>
          <Link
            onClick={() => this.handleButtonClick(p)}
            to={`other-work/${p._id}/edit`}
            className='btn btn-sm'
          >
            Edit
          </Link>
        </div>
      </li>
    );
  }

  render() {
    const {
      promiseLoading,
      articles
    } = this.props;

    return (
      <div>
        {promiseLoading ?
          <p>Loading...</p> :
          <div>
            <div className='news-feed-header'>
              <Link to='other-work/create' className='btn'>Create a new article</Link>
            </div>
            {
              !articles || !articles.length && (
                <p>Unable to fetch articles :(</p>
              )
            }

            {articles &&
              <ul>
                {articles.map((p) => this.renderArticle(p))}
              </ul>
            }
          </div>
        }

      </div>
    )
  }

}

OtherWorkHome.propTypes = {
  promiseLoading: PropTypes.bool,
  onFetchOtherWorkArticles: PropTypes.func.isRequired,
  articles: PropTypes.array,
  resetPromiseState: PropTypes.func
}

export default OtherWorkHome
