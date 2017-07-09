import React from 'react'
import PropTypes from 'prop-types'

class NewsPostPreview extends React.Component {
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

NewsPostPreview.propTypes = {
  post: PropTypes.object.isRequired
}

export default NewsPostPreview;
