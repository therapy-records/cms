import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchNewsArticles } from '../../actions/news';
import { fetchJournalismArticles } from '../../reducers/journalism';
import { resetPromiseState } from '../../actions/uiState';
import { selectNewsArticles } from '../../selectors/news';
import { selectUiStateLoading } from '../../selectors/uiState';
import { selectJournalismArticles } from '../../selectors/journalism';
import './styles.css';
import LoadingSpinner from '../../components/LoadingSpinner';

export class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  componentDidMount() {
    const {
      newsArticles,
      journalismArticles,
      onFetchNewsArticles,
      onFetchJournalismArticles
    } = this.props;
    if (newsArticles === null) {
      onFetchNewsArticles();
    }

    if (journalismArticles === null) {
      onFetchJournalismArticles();
    }
  }

  render() {
    const {
      newsArticles,
      journalismArticles,
      promiseLoading
    } = this.props;

    return (
      <div className='container container-dashboard'>
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        <h2>Welcome back 👋</h2>
        <br />
        <Link to='news/create' className='btn btn-sm'>Create news</Link>
        <Link to='journalism/create' className='btn btn-sm'>Add a Journalism article</Link>

        <br />
        <br />
        <br />
        <br />
        <br />

        <h3>Stats</h3>
        {newsArticles && <p>Monthly News articles: {newsArticles.length}</p>}
        {journalismArticles && <p>Journalism articles: {journalismArticles.length}</p>}
      </div>
    )
  }
}

Dashboard.propTypes = {
  newsArticles: PropTypes.array,
  onFetchNewsArticles: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  journalismArticles: PropTypes.array,
  onFetchJournalismArticles: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  newsArticles: selectNewsArticles(state),
  journalismArticles: selectJournalismArticles(state),
  promiseLoading: selectUiStateLoading(state)
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onFetchJournalismArticles: () => fetchJournalismArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
