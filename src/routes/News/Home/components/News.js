import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import moment from 'moment';
import './News.scss'

class News extends React.Component {

  componentWillMount(){
    if (!this.props.newsPosts || !this.props.newsPosts.length) {
      this.props.onFetchNews(); 
    }
  }

  componentWillUnmount(){
    this.props.resetPromiseState();
  }

  renderPost(p){
    return (
      <div key={p._id} className='news-card'>
        <div className='bg-inner' style={{ backgroundImage: `url('${p.mainImageUrl}')` }} />
        <div className='inner'>
          <h3>{p.title}</h3>
          {p.createdAt && <p>{moment(p.createdAt).fromNow()}</p>}
          <Link to={`news/${p._id}`} className='btn'>View</Link>
          <Link to={`news/${p._id}/edit`} className='btn'>Edit</Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      newsPosts
    } = this.props;

    if (!newsPosts) {
      return null;
    }

    return (
      <div>
        <div className='news-feed-header'>
          <Link to='news/create'>Create a new post</Link>
        </div>
        <br/>
        {!this.props.newsPosts || !this.props.newsPosts.length && (
          <p>Unable to fetch news posts :(</p>
        )}
        {this.props.newsPosts && 
          <div className='flex-root'>
            {this.props.newsPosts.map((p) => this.renderPost(p) )}
          </div> 
        }
      </div>
    )
  }
}

News.propTypes = {
  onFetchNews: PropTypes.func.isRequired,
  newsPosts: PropTypes.array.isRequired
}

export default News
