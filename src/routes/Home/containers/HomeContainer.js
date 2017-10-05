import { connect } from 'react-redux'
import Home from '../components/Home'
import { userLogin } from '../../../reducers/user'
import { authCheck } from '../../../actions/auth';

const mapDispatchToProps = {
  onAuthCheck: () => authCheck(),
  onPostForm : () => userLogin()
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.user.isAuth,
  authError: state.user.authError
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
