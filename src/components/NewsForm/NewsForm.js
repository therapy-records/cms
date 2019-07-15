import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleSections
} from '../../selectors/news';
import { selectNewsFormValues } from '../../selectors/form';
import './NewsForm.css';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';
import { NEWS_FORM } from '../../constants';
import NewsFormSectionFields from './NewsFormSectionFields';

export class NewsForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onSubmitForm();
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
            <h2>{isEditForm ? `Editing ${formValues && formValues.title} 🗞️` : 'Create News 🗞️'}</h2>
          </div>
          <div className='action-btns'>
            <p>delete button here</p>
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
            component={NewsFormSectionFields}
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

NewsForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: NEWS_FORM,
  enableReinitialize : true
})(NewsForm);

InitFromStateForm = connect(
  (state, props) => ({
    initialValues: {
      title: selectSelectedNewsArticleTitle(state),
      sections: selectSelectedNewsArticleSections(state) ||
                [ EMPTY_ARTICLE_SECTION_OBJ ]
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectNewsFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)
