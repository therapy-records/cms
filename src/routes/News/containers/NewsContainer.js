import { connect } from 'react-redux'
import { fetchNews, doubleAsync } from '../modules/news'

import News from '../components/News'

const mapDispatchToProps = {
  getNews: () => fetchNews()
}

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
