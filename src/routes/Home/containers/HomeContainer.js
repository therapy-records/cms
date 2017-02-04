import { connect } from 'react-redux'
import { userAuth } from '../modules/home'

import Home from '../components/Home'

const mapDispatchToProps = {
  onPostForm : () => userAuth()
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
