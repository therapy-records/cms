import { connect } from 'react-redux'
import { userLogin } from '../modules/home'

import Home from '../components/Home'

const mapDispatchToProps = {
  onPostForm : () => userLogin()
}

const mapStateToProps = (state) => ({
  postSuccess : state.user.isAuth
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
