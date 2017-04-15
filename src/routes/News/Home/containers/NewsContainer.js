import { connect } from 'react-redux'
import {
  fetchNews
} from '../modules/news'

import News from '../components/News'

const mapDispatchToProps = {
  onFetchNews: () => fetchNews()
}

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts.reverse()
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
