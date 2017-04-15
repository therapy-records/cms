import React from 'react'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsPostEdit extends React.Component {

  componentWillMount(){
    const id = this.props.location.pathname.replace(/\/news\/|\/edit/gi, '');
    this.props.onFetchNewsPost(id);
  }

  renderHtml(data) {
    return {__html: data}
  }

  render() {
    const { newsPost } = this.props;
    return (
      <article>
        <p>hello  from news post edit</p>
        <p>title of post: {newsPost.title}</p>
        <br />
        <br />
        <hr />
        <br />
        <br />
      {/* <NewsPostForm onSubmit={this.props.onPostNews} postSuccess={this.props.postSuccess}/> */}
      <NewsPostForm  />
      </article>
    )
  }
}

NewsPostEdit.propTypes = {
  // location: React.PropTypes.object.isRequired,
  onFetchNewsPost: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired
}

export default NewsPostEdit
