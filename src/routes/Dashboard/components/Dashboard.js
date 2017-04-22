import React from 'react'
import { Link } from 'react-router'
import './Dashboard.scss'

class Dashboard extends React.Component {

  componentWillMount() {
    if (!this.props.newsPosts.length) {
      this.props.onFetchNews();
    }
  }

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  render(){
    return (
      <div>
        <h2>Welcome back</h2>
        <Link to='news/create'>Create a new post</Link>
      </div>
    )
  }

}

export default Dashboard
