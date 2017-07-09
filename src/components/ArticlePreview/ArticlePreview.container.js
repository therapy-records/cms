import { connect } from 'react-redux'
import ArticlePreview from './ArticlePreview'
import { selectNewsPostFormValues } from '../../selectors/form'

const mapStateToProps = (state) => ({
  post: selectNewsPostFormValues(state)
})

export default connect(mapStateToProps, {})(ArticlePreview)
