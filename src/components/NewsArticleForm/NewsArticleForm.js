import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectSelectedNewsArticleSections
  // selectSelectedNewsArticleTitle,
  // selectSelectedNewsArticleQuotes,
  // selectSelectedNewsArticleBodyMain,
  // selectSelectedNewsArticleMainImageUrl,
  // selectSelectedNewsArticleMainImageExternalLink,
  // selectSelectedNewsArticleSecondaryImageUrl,
  // selectSelectedNewsArticleTicketsLink,
  // selectSelectedNewsArticleVenueLink,
  // selectSelectedNewsArticleMiniGalleryImages,
  // selectSelectedNewsArticleVideoEmbed,
  // selectSelectedNewsArticleSocialShareHashtags
} from '../../selectors/news';
import { selectNewsArticleFormValues } from '../../selectors/form';
import './NewsArticleForm.css';
import DropzoneImageUpload from './DropzoneImageUpload';
import Quotes from './Quotes';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
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
            <ArticlePreview />
          </div>
        </div>

        <div className='col-clear' />

        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>

        <div className='row-large'>
            <Field name='month'
                  component={TextInput}
                  type='text'
                  placeholder='January update'
                  label='Month'
                  validate={required}
                  required
            />
          </div>

          <ul>
            {(formValues && formValues.sections) && formValues.sections.map((section, index) => {
              return (
                <li key={index}>
                  <div className="row-large cols-container">
                    <Field
                      name='bodyMain'
                      title="Copy"
                      component={RichTextEditor}
                      validate={required}
                      required
                    />

                    <Field
                      name='mainImage.url'
                      title='Image'
                      component={DropzoneImageUpload}
                      existingImage={formValues && formValues.mainImage && formValues.mainImage.url}
                      minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
                    />
                  </div>

                  <div className='row-large'>
                    <Field name='quotes'
                      component={Quotes} />
                  </div>
                </li>
              );
            })}
          </ul>
          
          <button
            type='button'
            onClick={this.handleAddSection}
            >Add a new section
          </button>


          {error && <p>{error}</p>}


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
    /*
    initialValues: {
      month: selectSelectedNewsArticleTitle(state),
      bodyMain: selectSelectedNewsArticleBodyMain(state),
      quotes: selectSelectedNewsArticleQuotes(state),
      mainImage: {
        url: selectSelectedNewsArticleMainImageUrl(state),
        externalLink: selectSelectedNewsArticleMainImageExternalLink(state)
      },
      secondaryImageUrl: selectSelectedNewsArticleSecondaryImageUrl(state),
      ticketsLink: selectSelectedNewsArticleTicketsLink(state),
      venueLink: selectSelectedNewsArticleVenueLink(state),
      videoEmbed: selectSelectedNewsArticleVideoEmbed(state),
      miniGalleryImages: selectSelectedNewsArticleMiniGalleryImages(state),
      socialShare: {
        hashtags: selectSelectedNewsArticleSocialShareHashtags(state)
      }
    }
    */
    initialValues: {
      sections: selectSelectedNewsArticleSections(state)
    }
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectNewsArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)
