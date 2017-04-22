import { connect } from 'react-redux'
import { fetchNews } from '../../../../reducers/news'
import { resetPromiseState } from '../../../../reducers/uiState'
import News from '../components/News'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  newsPosts : state.news.posts.reverse()
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
