import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import RichTextEditor from '../RichTextEditor';
import { required } from '../../utils/form';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';
import NewsFormSectionFieldImages from './NewsFormSectionFieldImages';

class NewsFormSectionFields extends PureComponent {
  render() {
    const {fields} = this.props;

    return (
      <div>
        <ul>
          {fields.map((section, index) => (
            <li
              key={`${index}_${fields.length}`}
              className="row-large"
            >

              {fields.length > 1 &&
                <div className="news-article-form-section-heading">
                  <h4>Section {index + 1}</h4>
                  <button
                    type="button"
                    className="btn-sm btn-danger"
                    onClick={() => fields.remove(index)}
                  >
                    Remove
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

                <div className="row">
                  <FieldArray
                    name={`${section}.images`}
                    component={NewsFormSectionFieldImages}
                  />
                </div>

              </div>

            </li>
          ))}
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
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default NewsFormSectionFields;
