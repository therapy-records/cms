import { connect } from 'react-redux'
import { fetchNewsArticles, fetchNewsQueueArticles } from '../../../../reducers/news'
import { setSelectedNewsArticle } from '../../../../reducers/newsArticle'
import { resetPromiseState } from '../../../../reducers/uiState'
import {
  selectNewsArticlesReverse,
  selectNewsArticlesQueueReverse
} from '../../../../selectors/news'
import News from '../components/News'

const mapDispatchToProps = {
  onFetchNewsArticles: () => fetchNewsArticles(),
  onFetchNewsQueueArticles: () => fetchNewsQueueArticles(),
  onSetSelectedNewsArticle: (article) => setSelectedNewsArticle(article),
  resetPromiseState: () => resetPromiseState()
}

const mapStateToProps = (state) => ({
  newsArticles: selectNewsArticlesReverse(state),
  articlesQueue : selectNewsArticlesQueueReverse(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
