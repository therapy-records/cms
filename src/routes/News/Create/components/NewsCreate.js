import React from 'react'
import NewsPostForm  from '../../../../components/NewsPostForm'

class News extends React.Component {

  render() {
    return (
      <div>
        <NewsPostForm onSubmit={this.props.onPostNews} postSuccess={this.props.postSuccess}/>
      </div>
    )
  }
}

News.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  postSuccess: React.PropTypes.bool.isRequired
}

export default News
