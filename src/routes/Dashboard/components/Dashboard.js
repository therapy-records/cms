import React from 'react'
import { Link } from 'react-router'
import './Dashboard.scss'

class Dashboard extends React.Component {

  componentDidMount() {
    if (!this.props.newsPosts.length) {
      this.props.onFetchNews();
    }
  }

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  render(){

    const {
      newsPosts
    } = this.props;

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

export default Dashboard
