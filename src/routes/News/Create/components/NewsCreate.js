import React from 'react'
import NewsPostForm  from '../../../../components/NewsPostForm'

class News extends React.Component {

  render() {
    return (
      <div>
        <NewsPostForm onSubmit={this.props.onPostNews}/>
      </div>
    )
  }
}

export default News
