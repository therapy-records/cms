import { connect } from 'react-redux'
import { fetchNewsPosts, fetchNewsQueuePosts } from '../../../../reducers/news'
import { resetPromiseState } from '../../../../reducers/uiState'
import News from '../components/News'

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  onFetchNewsQueuePosts: () => fetchNewsQueuePosts(),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  newsPosts : state.news.posts && state.news.posts.reverse(),
  postsQueue : state.news.postsQueue && state.news.postsQueue.reverse()
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
