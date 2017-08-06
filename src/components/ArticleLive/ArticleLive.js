import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
        {moment(article.createdAt).format('DD MMM YYYY')}

        <div dangerouslySetInnerHTML={this.renderHtml(article.bodyMain)} />

        <br />

        <div className='cols-container'>

          {article.mainImageUrl &&
            <div>
              <img
                src={article.mainImageUrl}
                alt={`Fiona Ross - ${article.title}`}
              />
            </div>
          }

          {article.secondaryImageUrl &&
            <div>
              <img
                src={article.secondaryImageUrl}
                alt={`Fiona Ross - ${article.title}`}
              />
            </div>
          }

        </div>

        <br />
        <br />

        {(article.miniGalleryImages && article.miniGalleryImages.length) &&
          <div>
            <p><i>Images to display as a gallery when live</i></p>
            <ul className='article-gallery-flex-root'>
              {article.miniGalleryImages.map((i) => (
                <li key={i} className='article-col-50 no-list-style article-gallery-item'>
                  <img src={i} />
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

ArticleLive.propTypes = {
  article: PropTypes.object.isRequired
}

export default ArticleLive;
