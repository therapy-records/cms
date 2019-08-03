import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, change, arrayRemove } from 'redux-form';
import DropzoneImageUpload from './DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';
import { required } from '../../utils/form';
import {
  EMPTY_ARTICLE_SECTION_OBJ,
  NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS
} from '../../utils/news';

export class NewsFormSectionFields extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateSectionImages = this.handleUpdateSectionImages.bind(this);
    this.handleRemoveSectionImage = this.handleRemoveSectionImage.bind(this);
  }

  handleUpdateSectionImages(imageUrl, sectionImageIndex, sectionIndex) {
    this.props.updateSectionImages('NEWS_FORM', `sections.${sectionIndex}.images.${sectionImageIndex}.url`, imageUrl);
  }

  handleRemoveSectionImage(sectionImageIndex, sectionIndex) {
    this.props.removeSectionImage('NEWS_FORM', `sections.${sectionIndex}.images`, sectionImageIndex);
  }
  
  render() {
    const {fields} = this.props;

    return (
      <div>
        <ul>
          {fields.map((section, sectionIndex) => {
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
                      type="button"
                      className="btn-sm btn-danger"
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
                      required
                    />
                  </div>

                  <div className={fields.length > 1 ? 'row last' : 'row'}>
                    <DropzoneImageUpload
                      title="Images"
                      component={DropzoneImageUpload}
                      existingImages={sectionImagesArray.length ? sectionImagesArray : []}
                      minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
                      onChange={(imageUrl, sectionImageIndex) =>
                        this.handleUpdateSectionImages(imageUrl, sectionImageIndex, sectionIndex)
                      }
                      onRemove={(sectionImageIndex) =>
                        this.handleRemoveSectionImage(sectionImageIndex, sectionIndex)
                      }
                    />
                  </div>

                </div>

              </li>
            );
          })}
        </ul>

        <div className='row-large'>
          <button
            type="button"
            onClick={() => {
              fields.push(EMPTY_ARTICLE_SECTION_OBJ);
              setTimeout(() => {
                window.scrollBy({
                  top: 550
                })
              }, 5);
            }}
          >
            Add section
          </button>
        </div>

      </div>
    );
  }
}

NewsFormSectionFields.propTypes = {
  fields: PropTypes.object,
  updateSectionImages: PropTypes.func.isRequired,
  removeSectionImage: PropTypes.func.isRequired
};

export const mapDispatchToProps = {
  updateSectionImages: (...args) => change(...args),
  removeSectionImage: (...args) => arrayRemove(...args)
};

export default connect(null, mapDispatchToProps)(NewsFormSectionFields);


