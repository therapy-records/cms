import { connect } from 'react-redux'

import News from '../components/News'

const mapDispatchToProps = {
  // increment : () => increment(1),
  // doubleAsync
}

const mapStateToProps = (state) => ({
  dashboard : state.dashboard
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
