import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router';
import LoginForm from '../../../components/LoginForm'
import './Home.scss';

export class Home extends React.Component {

  componentWillMount() {
    if (!this.props.isAuthenticated && this.props.onAuthCheck) {
      this.props.onAuthCheck();
    }
    if (this.props.isAuthenticated === true) {
      browserHistory.push('/dashboard');
    }
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated === true) {
      browserHistory.push('/dashboard');
    }
  }

  render() {
    const {
      onPostForm,
      isAuthenticated,
      authError
    } = this.props;

    return (
      <div className='home-root'>
        <div>
          {!isAuthenticated ? (
            <LoginForm
              onSubmit={() => { onPostForm(); }}
              isAuthenticated={isAuthenticated}
              authError={authError}
            />
          ) : (
            <p>already logged in, redirecting...</p>
          )}
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  onPostForm: PropTypes.func,
  onAuthCheck: PropTypes.func.isRequired,
  authError: PropTypes.string
}

export default Home
