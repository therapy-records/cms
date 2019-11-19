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
  componentDidMount() {
    if (!this.props.isAuth) {
      this.props.onAuthCheck();
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuth } = this.props;

    if ((prevProps.isAuth !== isAuth) && isAuth) {
      const url = (this.props.location.state && this.props.location.state.from.pathname) || '/dashboard';
      this.doRedirect(url);
    }
  }

  doRedirect(url) {
    this.props.history.push({
        pathname: url
    });
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
        
        {(isAuth || isAuth === null) &&
            <div>
              <LoadingSpinner
                active
                fullScreenIgnoreSidebar
              />
            </div>
          }

          {isAuth === false &&
              <LoginForm
                onSubmit={onPostForm}
                isAuth={isAuth}
                authError={authError}
                promiseLoading={promiseLoading}
              />
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

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
  promiseLoading: selectUiStateLoading(state),
  authError: state.user.authError
})

const mapDispatchToProps = {
  onPostForm: () => userLogin(),
  onAuthCheck: () => authCheck()
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
