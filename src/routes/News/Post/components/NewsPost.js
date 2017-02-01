import React from 'react'

class NewsPost extends React.Component {

  componentWillMount(){
    let id = this.props.location.pathname.split('/news/')[1];
    this.props.onFetchNewsPost(id);
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { newsPost } = this.props;
    return (
      <article>
        <h2>{newsPost.title}</h2>
        <small>{newsPost.createdAt}</small>
        <div dangerouslySetInnerHTML={this.renderHtml(newsPost.mainBody)}></div>
      </article>
    )
  }
}

export default NewsPost
