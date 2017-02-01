import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  fetchNewsPost
} from '../modules/news'

import NewsPost from '../components/NewsPost'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id)
}

const mapStateToProps = (state) => ({
  newsPost : state.newsPost
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)

