import { connect } from 'react-redux'
import { userLogin } from '../modules/home'
import Home from '../components/Home'
import { authCheck } from '../../../actions/auth';

const mapDispatchToProps = {
  onAuthCheck: () => authCheck(),
  onPostForm : () => userLogin()
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.user.isAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
