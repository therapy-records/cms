import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DropzoneImageUpload from './DropzoneImageUpload';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';

export const NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 450,
  height: 450
};

class NewsFormSectionFieldImages extends PureComponent {
  render() {
    const {
      fields
    } = this.props;

    if (!fields.length) {
      fields.push(EMPTY_ARTICLE_SECTION_OBJ);
    }

    return (
      <div>
        <ul>
          {fields.length ? fields.map((imageSection, index) => (
            <li key={index}>
              <Field
                name={`${imageSection}.url`}
                title='Image'
                component={DropzoneImageUpload}
                existingImage={fields.get(index).url}
                minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
              />

            </li>
          )) : (
              <Field
                name={`${fields[0]}.url`}
                title='Image'
                component={DropzoneImageUpload}
                minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
              />
          )}
        </ul>
      </div>
    );
  }
}

NewsFormSectionFieldImages.propTypes = {
  fields: PropTypes.object
};

export default NewsFormSectionFieldImages;
