import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm'

import { userLogin } from '../../reducers/user'
import { authCheck } from '../../actions/auth';
import './styles.css';

export class Home extends React.Component {

  componentWillMount() {
    if (!this.props.isAuthenticated && this.props.onAuthCheck) {
      this.props.onAuthCheck();
    }
    if (this.props.isAuthenticated === true) {
      this.props.history.push({
        pathname: '/dashboard'
      });
    }
  }

  componentWillReceiveProps(props) {
    const fromPath = (props.location.state && props.location.state.from.pathname) || '/dashboard';
    if (props.isAuthenticated === true) {
      props.history.push({
        pathname: fromPath
      });
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


const mapDispatchToProps = {
  onAuthCheck: () => authCheck(),
  onPostForm: () => userLogin()
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuth,
  authError: state.user.authError
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
