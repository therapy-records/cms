import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, arrayRemove } from 'redux-form';
import NewsFormSectionField from './NewsFormSectionField';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';

export class NewsFormSection extends Component {
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
    const { fields } = this.props;
    
    return (
      <div>
        <ul>
          {fields.map((section, sectionIndex) => (
            <NewsFormSectionField
              fields={fields}
              section={section}
              key={sectionIndex}
              sectionIndex={sectionIndex}
              onUpdateSectionImages={this.handleUpdateSectionImages}
              onRemoveSectionImage={this.handleRemoveSectionImage}
            />
          ))}
        </ul>

        <div className='row-large'>
          <button
            type="button"
            className='btn-new-section'
            onClick={() => {
              fields.push(EMPTY_ARTICLE_SECTION_OBJ);
              setTimeout(() => {
                window.scrollBy({
                  top: 550
                })
              }, 5);
            }}
          >
            New section
          </button>
        </div>

      </div>
    );
  }
}

NewsFormSection.propTypes = {
  fields: PropTypes.object,
  updateSectionImages: PropTypes.func.isRequired,
  removeSectionImage: PropTypes.func.isRequired
};

export const mapDispatchToProps = {
  updateSectionImages: (...args) => change(...args),
  removeSectionImage: (...args) => arrayRemove(...args)
};

export default connect(null, mapDispatchToProps)(NewsFormSection);


