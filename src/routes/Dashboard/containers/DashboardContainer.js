import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNewsPosts } from '../../../reducers/news'
import { resetPromiseState } from '../../../reducers/uiState'

const mapStateToProps = (state) => ({
  newsPosts : state.news.posts
})

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

