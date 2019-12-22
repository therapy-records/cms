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
import ArticleHeader from '../ArticleHeader';
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
      onDeleteArticle,
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

        <ArticleHeader
          baseUrl='/news'
          article={formValues}
          onDeleteArticle={isEditForm ? () => onDeleteArticle(articleId) : () => {}}
          promiseLoading={promiseLoading}
          heading={isEditForm ? `Editing ${formValues && formValues.title} 🗞️` : 'Create News 🗞️'}
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
                    className='btn-lg btn-submit'
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
  onDeleteArticle: PropTypes.func.isRequired,
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
  onDeleteArticle: (id) => deleteNewsArticle(id),
};

export default connect(mapStateToProps, mapDispatchToProps)(InitFromStateForm)
