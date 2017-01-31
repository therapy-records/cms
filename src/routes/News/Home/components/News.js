import React from 'react'
import { Link } from 'react-router'
import './News.scss'

class News extends React.Component {

  componentWillMount(){
    this.props.onFetchNews();
  }

  render() {
    return (
      <div>
        <div className='news-feed-header'>
          <Link to='news/create'>Create a new post</Link>
        </div>
        <br/>
        {
          this.props.newsPosts.map((p) => (
            <div key={p._id} className='news-card'>
              <div className='inner'>
                <h3>{p.title}</h3>
                {p.createdAt}
              </div>
            </div>
          ))
        }
        {!this.props.newsPosts.length && (
          <p>Unable to fetch news posts :(</p>
        )}

      </div>

    )
  }
}

export default News
