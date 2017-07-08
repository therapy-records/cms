import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';
import LoginForm from '../../../components/LoginForm'

export class Home extends React.Component {

  componentWillMount() {
    if (!this.props.isAuthenticated && this.props.onAuthCheck) {
      this.props.onAuthCheck();
    }
  }
  redirectToDashboard() {
    browserHistory.push('/dashboard');
  }

  render() {
    const {
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

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  onPostForm: PropTypes.func,
  onAuthCheck: PropTypes.func.isRequired

}

export default Home
