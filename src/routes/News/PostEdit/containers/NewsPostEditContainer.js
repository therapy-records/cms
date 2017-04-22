import { connect } from 'react-redux'
import { fetchNews } from '../../Home/modules/news';
import { postNews, editNews } from '../../Create/modules/newsCreate'
import { selectNewsPostsPost } from '../../../../selectors/news';

import NewsPostEdit from '../components/NewsPostEdit'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onPostForm: (post) => editNews(post)
}

const mapStateToProps = (state, props) => ({
  newsPost: selectNewsPostsPost(state, props.params.id)[0] || {},
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsPostEdit)
