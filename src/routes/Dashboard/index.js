import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchNewsArticles } from '../../reducers/news';
import { resetPromiseState } from '../../reducers/uiState';
import { selectNewsArticles } from '../../selectors/news';
import './styles.scss';

export class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      newsArticles
    } = this.props;

    if (!newsArticles || !newsArticles.length) {
      this.props.onFetchNewsArticles();
    }

    return (
      <div>
        <h2>Welcome back</h2>
        <Link to='news/create' className='btn'>Create a new article</Link>

        <br />
        <br />
        <br />
        <br />

        <h3><strong>Stats</strong></h3>
        {newsArticles && <p>News articles: {newsArticles.length}</p>}
        <p>Press releases: Coming soon...</p>
        <p>Other Work articles: Coming soon...</p>
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
  newsArticles: selectNewsArticles(state)
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

