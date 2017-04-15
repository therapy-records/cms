import { connect } from 'react-redux'
import {
  fetchNewsPost,
  postNews,
  destroyNewsPost
} from '../../Post/modules/news'
// import { postNews } from '../../Post/modules/news'
import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id),
  onPostNews: () => postNews(),
  onUnmount: () => destroyNewsPost()
}

const mapStateToProps = (state) => ({
  newsPost : state.selectedNewsPost
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)
