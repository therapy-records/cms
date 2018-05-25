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

export class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      newsArticles,
      otherWorkArticles
    } = this.props;

    if (newsArticles === null) {
      this.props.onFetchNewsArticles();
    }

    if (otherWorkArticles === null) {
      this.props.onFetchOtherWorkArticles();
    }

    return (
      <div className="container-dashboard">
        <h2>Welcome back</h2>
        <p>Create a new...</p>
        <Link to='news/create' className='btn'>News article</Link>
        <Link to='other-work/create' className='btn'>Other Work article</Link>

        <br />
        <br />
        <br />
        <br />

        <h3><strong>Stats</strong></h3>
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
  otherWorkArticles: selectOtherWorkArticles(state)
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onFetchOtherWorkArticles: () => fetchOtherWorkArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

