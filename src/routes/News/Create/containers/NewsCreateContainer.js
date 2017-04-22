import { connect } from 'react-redux'
import {
  postNews
} from '../modules/newsCreate'

import NewsCreate from '../components/NewsCreate'

const mapDispatchToProps = {
  onPostNews: () => postNews()
}

const mapStateToProps = (state) => ({
  // postSuccess : state.newsCreate.success,
  promiseLoading: state.uiState.promiseLoading,
  promiseSuccess: state.uiState.promiseSuccess

})

export default connect(mapStateToProps, mapDispatchToProps)(NewsCreate)
