import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor';
import DropzoneImageUpload from './DropzoneImageUpload';
import {
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleSections
} from '../../selectors/news';
import { selectNewsArticleFormValues } from '../../selectors/form';
import './NewsArticleForm.css';
import TextInput from '../../components/TextInput';
import { required } from '../../utils/form';
import { NEWS_ARTICLE_FORM } from '../../constants';

export const NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 450,
  height: 450
};

export class NewsArticleForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddSection = this.handleAddSection.bind(this);
    this.renderSectionFields = this.renderSectionFields.bind(this);
    this.renderSectionImageFields = this.renderSectionImageFields.bind(this);
  }

  handleSubmit() {
    this.props.onSubmitForm();
  }

  handleAddSection() {
    const {
      formValues,
      onAddArticleSection
    } = this.props;

    onAddArticleSection(formValues);
  }

  renderSectionImageFields({ fields, meta: { error } }) {
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

  renderSectionFields({ fields, meta: { error } }) {
    return (
      <div>
        <ul>
        {fields.map((section, index) => (
          <li
            key={index}
            className="row-large cols-container"
          >

            <Field
              name={`${section}.copy`}
              title="Copy"
              component={RichTextEditor}
              validate={required}
              required
            />

            <FieldArray
              name={`${section}.images`}
              component={this.renderSectionImageFields}
            />

          </li>
        ))}
        </ul>
      </div>
    );
  }

  render() {
    const {
      error,
      pristine,
      submitting,
      invalid,
      location,
      formValues
    } = this.props;

    if (!formValues) return null;

    let isEditForm;
    if (location && location.pathname.includes('edit')) {
      isEditForm = true;
    } else {
      isEditForm = false;
    }

    return (
      <section className='root article-create'>
        <div className='heading-action-btns'>
          <div className='heading-with-btn'>
            <h2>{isEditForm ? `Editing ${formValues && formValues.title}` : 'Create News'}</h2>
          </div>
          <div className='action-btns'>
            <p>action buttons here</p>
          </div>
        </div>

        <div className='col-clear' />

        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>

          <div className='row-large'>
              <Field name='title'
                    component={TextInput}
                    type='text'
                    placeholder='January update'
                    label='Month'
                    validate={required}
                    required
              />
          </div>

          <FieldArray
            name="sections"
            component={this.renderSectionFields}
          />

          <div className='row-large'>
            <button type='submit'
                    className='btn-lg btn-submit'
                    disabled={error || pristine || submitting || error || invalid}
                    onClick={() => this.handleSubmit()}
                    >Post monthly update
            </button>
          </div>

        </form>
      </section>
    )
  }
}

NewsArticleForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onAddArticleSection: PropTypes.func.isRequired,
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: NEWS_ARTICLE_FORM,
  enableReinitialize : true
})(NewsArticleForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: selectSelectedNewsArticleTitle(state),
      sections: selectSelectedNewsArticleSections(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectNewsArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)
