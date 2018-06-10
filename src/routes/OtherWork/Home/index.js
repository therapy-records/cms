import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchOtherWorkArticles } from '../../../reducers/otherWork';
import { setSelectedOtherWorkArticle } from '../../../reducers/otherWorkArticle';
import { resetPromiseState } from '../../../reducers/uiState';
import { selectOtherWorkArticles } from '../../../selectors/otherWork';
import { selectUiStateLoading } from '../../../selectors/uiState';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

export class OtherWork extends React.Component {
  componentWillMount() {
    if (this.props.articles === null) {
      this.props.onFetchOtherWorkArticles();
    }
  }

  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  handleButtonClick(postObj) {
    this.props.onSetSelectedOtherWorkArticle(postObj);
  }

  renderArticle(p) {
    return (
      <li key={p._id} className='article-card'>
        <img src={p.mainImageUrl} alt="" />
        <div>
          <div className='heading-with-btn'>
            <h3>
              <Link
                onClick={() => this.handleButtonClick(p)}
                to={`other-work/${p._id}`}
              >{p.title}
              </Link>
            </h3>
            {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
          </div>

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

    const hasArticles = (articles && articles !== null) && articles.length;

    return (
      <div className='container'>
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        {!promiseLoading &&
          <div>

            <div className='heading-action-btns'>
              <div>
                <h2>Other Work</h2>
              </div>
              <div className='action-btns'>
                <Link to='other-work/create' className='btn'>Create</Link>
              </div>
            </div>

            {hasArticles
              ? <div>
                <ul className='cancel-margin'>
                  {articles.map((p) => this.renderArticle(p))}
                </ul>
              </div>
              : (
                <div>
                  <EmptyArticlesMessage type='other-work' />
                </div>
              )}
          </div>
        }

      </div>
    )
  }
}

OtherWork.propTypes = {
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
  promiseLoading: selectUiStateLoading(state),
  articles: selectOtherWorkArticles(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherWork);
