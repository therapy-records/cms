import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import { userLogin } from '../../reducers/user';
import { selectUiStateLoading } from '../../selectors/uiState';
import { authCheck } from '../../actions/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import './styles.css';

export class Home extends React.Component {
  componentWillMount() {
    if (this.props.isAuth === true) {
      this.props.history.push({
        pathname: '/dashboard'
      });
    }
  }

  componentDidMount() {
    if (this.props.isAuth === null ||
      this.props.isAuth === false) {
      this.props.onAuthCheck();
    }
  }

  componentWillReceiveProps(props) {
    const fromPath = (props.location.state && props.location.state.from.pathname) || '/dashboard';
    if (props.isAuth === true) {
      props.history.push({
        pathname: fromPath
      });
    }
  }

  render() {
    const {
      onPostForm,
      isAuth,
      authError,
      promiseLoading
    } = this.props;

    return (
      <div className='container home-container'>
        <div>
          {(isAuth === null ||
           isAuth === false) &&
              <LoginForm
                onSubmit={onPostForm}
                isAuth={isAuth}
                authError={authError}
                promiseLoading={promiseLoading}
              />
          }

          {isAuth &&
            <div>
              <LoadingSpinner
                active
                fullScreenIgnoreSidebar
              />
            </div>
          }

        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isAuth: PropTypes.bool,
  promiseLoading: PropTypes.bool,
  onPostForm: PropTypes.func,
  authError: PropTypes.string,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onAuthCheck: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onPostForm: () => userLogin(),
  onAuthCheck: () => authCheck()
}

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  promiseLoading: selectUiStateLoading(state),
  authError: state.user.authError
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
