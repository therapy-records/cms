import React from 'react'
import NewsPostForm  from '../../../../components/NewsPostForm'

class NewsPostEdit extends React.Component {

  componentWillMount(){
    const locationPathname = this.props.location.pathname;
    let id;
    if (locationPathname.includes('edit')) {
      id = locationPathname.replace(/\/edit/g, ''); 
      id = id.replace(/news\//g, ''); 
    } else {
      id = locationPathname.replace(/\/news\//gi, '');
    }
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
  onFetchNewsPost: React.PropTypes.func.isRequired,
  newsPost: React.PropTypes.object.isRequired
}

export default NewsPostEdit
