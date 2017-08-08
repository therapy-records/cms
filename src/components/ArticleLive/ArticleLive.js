import React from 'react';
import PropTypes from 'prop-types';

class ArticleLive extends React.Component {
  renderHtml(data) {
    return { __html: data }
  }

  render() {
    const {
      article
    } = this.props;
    return (
      <div>
        <div className='site-header' style={{ background: '#000', color: '#FFF', padding: 10 }}>
          <p>fr.co.uk...</p>
        </div>

        <h2>{article.title}</h2>

        <div dangerouslySetInnerHTML={this.renderHtml(article.bodyMain)} />

        <br />

        <img src={article.mainImageUrl} />

        <br />
        <br />

        {(article.miniGalleryImages && article.miniGalleryImages.length) &&
          <div>
            <ul className='article-gallery-flex-root'>
              {article.miniGalleryImages.map((i) => (
                <li key={i} className='article-col-50 no-list-style article-gallery-item'>
                  <img src={i} />
                </li>
              ))}
            </ul>
          </div>
        }

        <br />
        <br />

        <button className='btn-sm'>Share on Facebook</button>
        <button className='btn-sm'>Share on Twitter</button>

      </div>
    )
  }
}

ArticleLive.propTypes = {
  article: PropTypes.object.isRequired
}

export default ArticleLive;
