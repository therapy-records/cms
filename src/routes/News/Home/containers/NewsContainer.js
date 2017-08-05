import { connect } from 'react-redux'
import { fetchNewsPosts, fetchNewsQueuePosts } from '../../../../reducers/news'
import { setSelectedNewsPost } from '../../../../reducers/newsPost'
import { resetPromiseState } from '../../../../reducers/uiState'
import {
  selectNewsPostsReverse,
  selectNewsPostsQueueReverse
} from '../../../../selectors/news'
import News from '../components/News'

const mapDispatchToProps = {
  onFetchNewsPosts: () => fetchNewsPosts(),
  onFetchNewsQueuePosts: () => fetchNewsQueuePosts(),
  onSetSelectedNewsPost: (post) => setSelectedNewsPost(post),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  newsPosts: selectNewsPostsReverse(state),
  postsQueue : selectNewsPostsQueueReverse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
