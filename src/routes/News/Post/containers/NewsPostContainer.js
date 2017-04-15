import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  fetchNewsPost,
  deleteNewsPost,
  destroyNewsPost
} from '../modules/news'

import NewsPost from '../components/NewsPost'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id),
  onDeleteNewsPost: (id) => deleteNewsPost(id),
  onUnmount: () => destroyNewsPost()
}

const mapStateToProps = (state) => ({
  newsPost : state.selectedNewsPost
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)

