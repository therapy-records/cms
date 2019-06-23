import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchNewsArticles } from '../../reducers/news';
import { fetchJournalismArticles } from '../../reducers/journalism';
import { resetPromiseState } from '../../reducers/uiState';
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
      onfetchJournalismArticles
    } = this.props;
    if (newsArticles === null) {
      onFetchNewsArticles();
    }

    if (journalismArticles === null) {
      onfetchJournalismArticles();
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

        <h2>Create</h2>
        <Link to='news/create' className='btn'>News article</Link>
        <Link to='journalism/create' className='btn'>Journalism article</Link>

        <br />
        <br />
        <br />
        <br />
        <br />

        <h3>Stats</h3>
        {newsArticles && <p>News articles: {newsArticles.length}</p>}
        {journalismArticles && <p>Journalism articles: {journalismArticles.length}</p>}
        <p>Press releases: Coming soon...</p>
      </div>
    )
  }
}

Dashboard.propTypes = {
  newsArticles: PropTypes.array,
  onFetchNewsArticles: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired,
  journalismArticles: PropTypes.array,
  onfetchJournalismArticles: PropTypes.func.isRequired,
  promiseLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  newsArticles: selectNewsArticles(state),
  journalismArticles: selectJournalismArticles(state),
  promiseLoading: selectUiStateLoading(state)
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onfetchJournalismArticles: () => fetchJournalismArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
