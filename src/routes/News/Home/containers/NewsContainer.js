import { connect } from 'react-redux'
import {
  fetchNews,
  postNews
} from '../modules/news'

import News from '../components/News'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews(),
  onPostNews: () => postNews()
}

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
