import React from 'react'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsCreate extends React.Component {

  render() {
    return (
      <div>
        <NewsPostForm onSubmit={this.props.onPostNews} postSuccess={this.props.postSuccess}/>
      </div>
    )
  }
}

NewsCreate.propTypes = {
  onPostNews: React.PropTypes.func.isRequired,
  postSuccess: React.PropTypes.bool.isRequired
}

export default NewsCreate
