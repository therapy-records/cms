import { connect } from 'react-redux'
import { fetchOtherWorkArticles } from '../../../../reducers/otherWork'
import { setSelectedOtherWorkArticle } from '../../../../reducers/otherWorkArticle'
import { resetPromiseState } from '../../../../reducers/uiState'
import OtherWorkHome from '../components/OtherWorkHome'
import { selectOtherWorkArticles } from '../../../../selectors/otherWork'

const mapDispatchToProps = {
  onFetchOtherWorkArticles: () => fetchOtherWorkArticles(),
  onSetSelectedNewsArticle: (article) => setSelectedOtherWorkArticle(article),
  resetPromiseState: () => resetPromiseState()
};

const mapStateToProps = (state) => ({
  articles: selectOtherWorkArticles(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherWorkHome);
