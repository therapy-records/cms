import { connect } from 'react-redux'
import { userLogout } from '../../routes/Home/modules/home'

import Header from './Header'

const mapDispatchToProps = {
  onLogout : () => userLogout()
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.user.isAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
