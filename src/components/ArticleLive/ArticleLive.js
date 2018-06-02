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

    const articleHasMiniGalleryImages = article &&
                                        article.miniGalleryImages &&
                                        article.miniGalleryImages.length &&
                                        article.miniGalleryImages.length > 0;

    return (
      <div>
        <div className='site-header' style={{ background: '#000', color: '#FFF', padding: 10 }}>
          <p>fr.co.uk...</p>
        </div>

        <h2>{article.title}</h2>
        {moment(article.createdAt).format('DD MMM YYYY')}

        <div dangerouslySetInnerHTML={this.renderHtml(article.bodyMain)} />

        <br />

        {article.quotes
          ? <div>
            <ul>
              {article.quotes.map((q) =>
                <li key={q.author}>
                  <i>&quot;{q.copy}&quot;</i> - {q.author}
                </li>
              )}
            </ul>
          </div>
          : null}

        <br />

        <div className='cols-container'>

          {article.mainImage.url
            ? <div>
              {article.mainImage && article.mainImage.externalLink
                ? <a href={article.mainImage.externalLink}
                  target='_blank'>
                  <img
                    src={article.mainImage.url}
                    alt={`Fiona Ross - ${article.title}`}
                  />
                </a>
                : <img
                  src={article.mainImage.url}
                  alt={`Fiona Ross - ${article.title}`}
                />
              }
            </div>
            : null}

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

        {articleHasMiniGalleryImages
          ? <div>
            <p><i>Images to display as a gallery when live</i></p>
            <ul className='article-gallery-flex-root'>
              {article.miniGalleryImages.map((i) => (
                <li key={i} className='article-col-50 no-list-style article-gallery-item'>
                  <img src={i} alt='gallery shot' />
                </li>
              ))}
            </ul>
          </div>
          : null}

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
