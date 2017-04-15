import React from 'react'
import { Link } from 'react-router'
import moment from 'moment';
import './News.scss'

class News extends React.Component {

  componentWillMount(){
    this.props.onFetchNews();
  }

  renderPost(p){
    return (
      <div key={p._id} className='news-card'>
        <div className='inner'>
          <h3>{p.title}</h3>
          <p>{moment(p.createdAt).fromNow()}</p>
          <Link to={`news/${p._id}`}>View</Link>
          {' - '}
          <Link to={`news/${p._id}/edit`}>Edit</Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='news-feed-header'>
          <Link to='news/create'>Create a new post</Link>
        </div>
        <br/>
        {this.props.newsPosts.map((p) => this.renderPost(p) ) }
        {!this.props.newsPosts.length && (
          <p>Unable to fetch news posts :(</p>
        )}
      </div>
    )
  }
}

News.propTypes = {
  onFetchNews: React.PropTypes.func.isRequired,
  newsPosts: React.PropTypes.array.isRequired
}


export default News
