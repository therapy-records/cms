import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  fetchNewsPost,
  destroyNewsPost
} from '../modules/news'

import NewsPost from '../components/NewsPost'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id),
  onUnmount: () => destroyNewsPost()
}

const mapStateToProps = (state) => ({
  newsPost : state.selectedNewsPost
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)

