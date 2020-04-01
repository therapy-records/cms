import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropzoneImageUpload from '../DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';
import TextInput from '../../components/TextInput';
import { required } from '../../utils/form';
import { NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS } from '../../utils/news';

export class NewsFormSectionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImageUpload: false,
      showVideoEmbed: false
    };
    this.onToggleShowImageUpload = this.onToggleShowImageUpload.bind(this);
    this.onToggleShowVideoEmbed = this.onToggleShowVideoEmbed.bind(this);
  }

  componentDidMount() {
    const {
      fields,
      sectionIndex
    } = this.props;

    const sectionImages = fields.get(sectionIndex).images;
    const sectionVideoEmbed = fields.get(sectionIndex).videoEmbed;

    // temporary solution until DropzoneImageUpload is updated to handle `url` and `alt`
    // currently only handles array of strings/urls
    let sectionImagesArray = [];

    if (sectionImages.length) {
      sectionImagesArray = [
        ...sectionImages.map(imageObj => imageObj.url)
      ];
    }

    const existingImages = sectionImagesArray.length >= 1;

    if (existingImages) {
      this.onToggleShowImageUpload();
    }

    if (sectionVideoEmbed) {
      this.onToggleShowVideoEmbed();
    }
  }

  onToggleShowImageUpload() {
    this.setState({
      showImageUpload: true
    });
  }

  onToggleShowVideoEmbed() {
    this.setState({
      showVideoEmbed: true
    });
  }

  render() {
    const {
      fields,
      section,
      sectionIndex,
      onUpdateSectionImages,
      onRemoveSectionImage
    } = this.props;

    const {
      showImageUpload,
      showVideoEmbed
    } = this.state;

    const sectionImages = fields.get(sectionIndex).images;

    // temporary solution until DropzoneImageUpload is updated to handle `url` and `alt`
    // currently only handles array of strings/urls
    let sectionImagesArray = [];
    if (sectionImages.length) {
      sectionImagesArray = [
        ...sectionImages.map(imageObj => imageObj.url)
      ];
    }

    return (
      <li
        key={`${sectionIndex}_${fields.length}`}
        className={fields.length > 1 ? 'row-large news-form-section news-form-section-large' : 'news-form-section'}
      >

        {fields.length > 1 &&
          <div className="news-article-form-section-heading">
            <h4>Section {sectionIndex + 1}</h4>
            <button
              type='button'
              className='btn-sm btn-danger'
              onClick={() => fields.remove(sectionIndex)}
            >
              Remove section
            </button>
          </div>
        }

        <div>

          <div className="row">
            <Field
              name={`${section}.copy`}
              title="Copy"
              component={RichTextEditor}
              validate={required}
              placeholder='This month has been fantastic...'
              required
            />
          </div>

          <div className={fields.length > 1 ? 'row last row-buttons' : 'row row-buttons'}>
            {showImageUpload
              ? <DropzoneImageUpload
                title="Images"
                component={DropzoneImageUpload}
                existingImages={sectionImagesArray.length ? sectionImagesArray : []}
                minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
                onChange={(imageUrl, sectionImageIndex) =>
                  onUpdateSectionImages(imageUrl, sectionImageIndex, sectionIndex)
                }
                onRemove={(sectionImageIndex) =>
                  onRemoveSectionImage(sectionImageIndex, sectionIndex)
                }
              />
              : <button
                type='button'
                className='button-link'
                onClick={this.onToggleShowImageUpload}
              >
                Add image
              </button>
            }

            {showVideoEmbed
              ? <Field
                name={`${section}.videoEmbed`}
                type='text'
                label='Video (iframe embed)'
                component={TextInput}
                placeholder='<iframe .... />'
              />
              : <button
                type='button'
                className='button-link'
                onClick={this.onToggleShowVideoEmbed}
              >
                Add video (iframe embed)
              </button>
            }

          </div>

        </div>

      </li>
    );
  }
}

NewsFormSectionField.propTypes = {
  fields: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  onUpdateSectionImages: PropTypes.func.isRequired,
  onRemoveSectionImage: PropTypes.func.isRequired
};

export default NewsFormSectionField;
