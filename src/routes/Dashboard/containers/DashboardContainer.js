import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNews } from '../../News/Home/modules/news'
import { resetPromiseState } from '../../../reducers/uiState'

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts
})

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

