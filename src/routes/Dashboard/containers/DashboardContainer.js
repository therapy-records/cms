import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/dashboard'

import Dashboard from '../components/Dashboard'

const mapDispatchToProps = {
  increment : () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  dashboard : state.dashboard
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
