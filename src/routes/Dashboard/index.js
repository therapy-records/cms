import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchNewsArticles } from '../../actions/news';
import { fetchJournalismArticles } from '../../actions/journalism';
import { resetPromiseState } from '../../actions/uiState';
import { selectNewsArticles } from '../../selectors/news';
import { selectUiStateLoading } from '../../selectors/uiState';
import { selectJournalismArticles } from '../../selectors/journalism';
import LoadingSpinner from '../../components/LoadingSpinner';
import './style.css';

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
      <div className='container dashboard'>
        <LoadingSpinner
          active={promiseLoading}
          fullScreen
        />

        <h2>Welcome back <span className='wave'>👋</span></h2>
        <div className='ctas'>
          <Link to='news/create' className='btn'>Create News</Link>
          <Link to='journalism/create' className='btn'>Create Journalism</Link>
        </div>

        <h3>Stats</h3>
        {(newsArticles || journalismArticles) &&
          <ul>
            {newsArticles && <li>{newsArticles.length} News articles</li>}
            {journalismArticles && <li>{journalismArticles.length} Journalism articles</li>}
          </ul>
        }
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
