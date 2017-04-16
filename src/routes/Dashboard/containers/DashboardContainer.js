import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { fetchNews } from '../../News/Home/modules/news'

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts
})

const mapDispatchToProps = {
  onFetchNews: () => fetchNews()
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

