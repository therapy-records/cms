import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { deleteNewsArticle } from '../../actions/newsArticle';
import {
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleSections
} from '../../selectors/news';
import { selectNewsFormValues } from '../../selectors/form';
import { selectUiStateLoading } from '../../selectors/uiState';
import './NewsForm.css';
import EntityPageHeader from '../EntityPageHeader';
import TextInput from '../TextInput';
import { required } from '../../utils/form';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';
import { NEWS_FORM } from '../../constants';
import NewsFormSection from './NewsFormSection';

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
      formValues,
      onDeleteEntity,
      articleId,
      promiseLoading
    } = this.props;

    if (!formValues) return null;

    let isEditForm;
    if (location && location.pathname.includes('edit')) {
      isEditForm = true;
    } else {
      isEditForm = false;
    }

    const submitButtonCopy = isEditForm ? 'Update article' : 'Post monthly update';

    return (
      <section className='article-create'>

        <EntityPageHeader
          entityName='news'
          entity={formValues}
          heading={isEditForm ? `Editing ${formValues && formValues.title} 🗞️` : 'Create News 🗞️'}
          onDeleteEntity={isEditForm ? () => onDeleteEntity(articleId) : null}
          promiseLoading={promiseLoading}
          showDeleteButton={isEditForm}
        />

        <div className='col-clear' />

        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>

          <div className='row-large'>
              <Field name='title'
                    component={TextInput}
                    type='text'
                    placeholder='January 2019 update'
                    label='Title'
                    validate={required}
                    required
              />
          </div>

          <FieldArray
            name="sections"
            component={NewsFormSection}
          />

          <div className='row-large'>
            <button type='submit'
                    className='btn-lg'
                    disabled={error || pristine || submitting || error || invalid}
                    onClick={() => this.handleSubmit()}
            >{submitButtonCopy}
            </button>
          </div>

        </form>
      </section>
    )
  }
}

NewsForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  onDeleteEntity: PropTypes.func.isRequired,
  articleId: PropTypes.string,
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  location: PropTypes.object,
  promiseLoading: PropTypes.bool
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
  formValues: selectNewsFormValues(state),
  promiseLoading: selectUiStateLoading(state),
});

const mapDispatchToProps = {
  onDeleteEntity: (id) => deleteNewsArticle(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(InitFromStateForm)
