import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropzoneImageUpload from './DropzoneImageUpload';

export const NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 450,
  height: 450
};

class NewsFormSectionFieldImages extends PureComponent {
  render() {
    const {
      fields
    } = this.props;

    return (
      <div>
        <ul>
          {fields.map((imageSection, index) => (
            <li key={index}>
              <Field
                name={`${imageSection}.url`}
                title='Image'
                component={DropzoneImageUpload}
                existingImage={fields.get(index).url}
                minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
              />

            </li>
          ))}
        </ul>
      </div>
    );
  }
}

NewsFormSectionFieldImages.propTypes = {
  fields: PropTypes.object
};

export default NewsFormSectionFieldImages;
