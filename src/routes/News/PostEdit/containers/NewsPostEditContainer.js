import { connect } from 'react-redux'
import { fetchNewsPost, postNews } from '../../Post/modules/news'
// import { postNews } from '../../Post/modules/news'
import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id),
  onPostNews: () => postNews()
}

const mapStateToProps = (state) => ({
  newsPost : state.newsPost
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)
