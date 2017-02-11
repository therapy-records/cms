import React from 'react'
import LoginForm from '../../../components/LoginForm'

class Home extends React.Component {
  render() {

    return (
      <div>
        <LoginForm onSubmit={this.props.onPostForm} postSuccess={this.props.postSuccess}/>
      </div>
    )
  }
}

export default Home
