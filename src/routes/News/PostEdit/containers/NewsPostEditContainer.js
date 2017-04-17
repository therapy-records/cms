import { connect } from 'react-redux'
import { fetchNews } from '../../Home/modules/news';
import { postNews } from '../../Post/modules/news'
import { selectNewsPostsPost } from '../../../../selectors/news';

import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onPostNews: () => postNews()
}

const mapStateToProps = (state, props) => ({
  newsPost: selectNewsPostsPost(state, props.params.id)[0] || {}
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)
