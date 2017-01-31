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

export default News
