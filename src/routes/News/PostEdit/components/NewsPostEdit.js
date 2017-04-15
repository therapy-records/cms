import React from 'react'

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
