import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNewsArticles } from '../../../reducers/news'
import { resetPromiseState } from '../../../reducers/uiState'
import { selectNewsArticles } from '../../../selectors/news'

const mapStateToProps = (state) => ({
  newsArticles : selectNewsArticles(state)
})

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  resetPromiseState: () => resetPromiseState()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

