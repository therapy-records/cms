import { connect } from 'react-redux'
import {
  fetchNewsPost
} from '../../Post/modules/news'

import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNewsPost: (id) => fetchNewsPost(id)
}

const mapStateToProps = (state) => ({
  newsPost : state.newsPost
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)
