import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNews } from '../../../reducers/news'
import { resetPromiseState } from '../../../reducers/uiState'

const mapStateToProps = (state) => ({
  newsPosts : state.news.posts
})

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

