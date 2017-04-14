import React from 'react'
import { browserHistory } from 'react-router';
import LoginForm from '../../../components/LoginForm'

class Home extends React.Component {
  redirectToDashboard(){
    browserHistory.push('/dashboard');
  }

  render() {
    const  {
      isAuthenticated
    } = this.props;

    if (isAuthenticated) {
      this.redirectToDashboard();
    }

    return (
      <div>
        {!isAuthenticated &&
          <LoginForm onSubmit={this.props.onPostForm} isAuthenticated={this.props.isAuthenticated} />
        }
      </div>
    )
  }
}

export default Home
