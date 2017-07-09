import React from 'react'
import PropTypes from 'prop-types'

class ArticlePreview extends React.Component {
  render(){
    const {
      post
    } = this.props;
    return (
      <div>
        <button>Preview post</button>
      </div>
    )
  }
}

ArticlePreview.propTypes = {
  post: PropTypes.object.isRequired
}

export default ArticlePreview;
