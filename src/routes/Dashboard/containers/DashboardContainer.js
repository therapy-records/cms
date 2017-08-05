import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNewsPosts } from '../../../reducers/news'
import { resetPromiseState } from '../../../reducers/uiState'
import { selectNewsPosts } from '../../../selectors/news'

const mapStateToProps = (state) => ({
  newsPosts : selectNewsPosts(state)
})

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

