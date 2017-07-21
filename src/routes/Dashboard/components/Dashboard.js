import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './Dashboard.scss'

export class Dashboard extends React.Component {
  componentWillUnmount() {
    this.props.resetPromiseState();
  }

  render() {
    const {
      newsPosts
    } = this.props;

    if (!newsPosts || !newsPosts.length) {
      this.props.onFetchNewsPosts();
    }

    return (
      <div>
        <h2>Welcome back</h2>
        <Link to='news/create'>Create a new post</Link>

        <br />
        <br />

        <p>Stats</p>
        {newsPosts && <p>News posts: {newsPosts.length}</p>}
        {/*
        <p>Press releases: ...</p>
        <p>Collaborators: ...</p>
        <p>Gallery pics: ...</p>
        */}
      </div>
    )
  }

}

Dashboard.propTypes = {
  newsPosts: PropTypes.array,
  onFetchNewsPosts: PropTypes.func.isRequired,
  resetPromiseState: PropTypes.func.isRequired
}

export default Dashboard
