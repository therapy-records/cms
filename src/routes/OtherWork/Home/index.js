import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchOtherWorkArticles } from '../../../reducers/otherWork';
import { setSelectedOtherWorkArticle } from '../../../reducers/otherWorkArticle';
import { resetPromiseState } from '../../../reducers/uiState';
import { selectOtherWorkArticles } from '../../../selectors/otherWork'


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
    this.props.onSetSelectedOtherWorkArticle(postObj);
  }

  renderArticle(p) {
    return (
      <li key={p._id} className='article-card'>
        <img src={p.mainImageUrl} alt="" />
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

    const hasArticles = articles && articles.length;

    return (
      <div>
        {promiseLoading ?
          <p>Loading...</p> :
          <div>
            <div className='news-feed-header'>
              <Link to='other-work/create' className='btn'>Create a new article</Link>
            </div>

            {hasArticles ?
              <ul>
                {articles.map((p) => this.renderArticle(p))}
              </ul>
            : <p>Unable to fetch articles :(</p>}
          </div>
        }

      </div>
    )
  }

}

OtherWorkHome.propTypes = {
  promiseLoading: PropTypes.bool,
  onFetchOtherWorkArticles: PropTypes.func.isRequired,
  onSetSelectedOtherWorkArticle: PropTypes.func.isRequired,
  articles: PropTypes.array,
  resetPromiseState: PropTypes.func
}

const mapDispatchToProps = {
  onFetchOtherWorkArticles: () => fetchOtherWorkArticles(),
  onSetSelectedOtherWorkArticle: (article) => setSelectedOtherWorkArticle(article),
  resetPromiseState: () => resetPromiseState()
};

const mapStateToProps = (state) => ({
  articles: selectOtherWorkArticles(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherWorkHome);
