import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchNewsArticles } from '../../reducers/news';
import { fetchOtherWorkArticles } from '../../reducers/otherWork';
import { resetPromiseState } from '../../reducers/uiState';
import { selectNewsArticles } from '../../selectors/news';
import { selectOtherWorkArticles } from '../../selectors/otherWork';
import './styles.css';
import LoadingSpinner from '../../components/LoadingSpinner';

export class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  componentDidMount() {
    const {
      newsArticles,
      otherWorkArticles,
      onFetchNewsArticles,
      onFetchOtherWorkArticles
    } = this.props;
    if (newsArticles === null) {
      onFetchNewsArticles();
    }

    if (otherWorkArticles === null) {
      onFetchOtherWorkArticles();
    }
  }

  render() {
    const {
      newsArticles,
      otherWorkArticles,
      promiseLoading
    } = this.props;

    return (
      <div className='container container-dashboard'>
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        <h2>Create</h2>
        <Link to='news/create' className='btn'>News article</Link>
        <Link to='other-work/create' className='btn'>Other Work article</Link>

        <br />
        <br />
        <br />
        <br />
        <br />

        <h3>Stats</h3>
        {newsArticles && <p>News articles: {newsArticles.length}</p>}
        {otherWorkArticles && <p>Other-work articles: {otherWorkArticles.length}</p>}
        <p>Press releases: Coming soon...</p>
      </div>
    )
  }
}

Dashboard.propTypes = {
  newsArticles: PropTypes.array,
  onFetchNewsArticles: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  newsArticles: selectNewsArticles(state),
  otherWorkArticles: selectOtherWorkArticles(state),
  promiseLoading: state.uiState.promiseLoading
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onFetchOtherWorkArticles: () => fetchOtherWorkArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
