import React from 'react'
import { browserHistory } from 'react-router';
import LoginForm from '../../../components/LoginForm'

class Home extends React.Component {
  redirectToDashboard(){
    setTimeout(() => {
      browserHistory.push('/dashboard');
    }, 10);
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
        {!isAuthenticated ? (
          <LoginForm onSubmit={() => { this.props.onPostForm(); }} isAuthenticated={this.props.isAuthenticated} />
        ) : (
          <p>already logged in, redirecting...</p>
        )}
      </div>
    )
  }
}

export default Home
