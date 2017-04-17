import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchNews } from '../../Home/modules/news';
import { deleteNewsPost } from '../modules/news'
import { selectNewsPostsPost } from '../../../../selectors/news';

import NewsPost from '../components/NewsPost'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onDeleteNewsPost: (id) => deleteNewsPost(id)
}

const mapStateToProps = (state, props) => ({
  newsPost: selectNewsPostsPost(state, props.params.id)[0] || {}
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsPost)

