import { connect } from 'react-redux'
import {
  fetchNews,
  postNews,
  doubleAsync
} from '../modules/news'

import News from '../components/News'

const mockPost = {
  title: 'something',
  body: 'hello'
};

const mapDispatchToProps = {
  getNews: () => fetchNews(),
  onPostNews: () => postNews()
}

const mapStateToProps = (state) => ({
  newsPosts : state.newsPosts
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
