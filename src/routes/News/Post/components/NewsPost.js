import React from 'react'
import moment from 'moment';

class NewsPost extends React.Component {

  componentWillMount(){
    let id = this.props.location.pathname.replace('news/', '');
    this.props.onFetchNewsPost(id);
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { newsPost } = this.props;
    return (
      <article>
       {
        newsPost && newsPost.title ? (
          <div>
            <h2>{newsPost.title}</h2>
            <p>Created {moment(newsPost.createdAt).fromNow()} <small>{moment(newsPost.createdAt).format('DD/mm/YYYY')}</small></p>
            {newsPost.editedAt && 
              <p>Last modified {moment(newsPost.editedAt).fromNow()} <small>{moment(newsPost.editedAt).format('DD/mm/YYYY')}</small></p>
            }
            <br />
            <br />
            <div dangerouslySetInnerHTML={this.renderHtml(newsPost.mainBody)}></div>
          </div>
        ) : (
          <p>error fetching news post :(</p>
        )
       }
      </article>
    )
  }
}

NewsPost.propTypes = {
  location: React.PropTypes.object.isRequired,
  onFetchNewsPost: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired
}

export default NewsPost
