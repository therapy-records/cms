import React from 'react'
import NewsPostForm  from '../../../components/NewsPostForm'

class News extends React.Component {

  componentWillMount(){
    this.props.onFetchNews();
  }

  render() {
    return (
      <div>
        {
          this.props.newsPosts.map((p) => (
            <div key={p._id}>
              <h3>{p.title}</h3>
              {p.createdAt}
            </div>
          ))
        }
        {!this.props.newsPosts.length && (
          <p>Unable to fetch news posts :(</p>
        )}

        <NewsPostForm onSubmit={this.props.onPostNews}/>

      </div>

    )
  }
}

export default News
