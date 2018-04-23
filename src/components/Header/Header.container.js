import { connect } from 'react-redux'
import { userLogout } from '../../reducers/user'
import Header from './Header';

const mapDispatchToProps = {
  onLogout : () => userLogout()
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.user.isAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
