import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import RichTextEditor from '../RichTextEditor'
import {
  selectSelectedNewsArticleTitle,
  selectSelectedNewsArticleQuotes,
  selectSelectedNewsArticleBodyMain,
  selectSelectedNewsArticleMainImageUrl,
  selectSelectedNewsArticleMainImageExternalLink,
  selectSelectedNewsArticleSecondaryImageUrl,
  selectSelectedNewsArticleTicketsLink,
  selectSelectedNewsArticleVenueLink,
  selectSelectedNewsArticleMiniGalleryImages,
  selectSelectedNewsArticleVideoEmbed,
  selectSelectedNewsArticleSocialShareHashtags
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

export const bodyMainRTE = ({ input, title, onChange, props, meta: { touched, error } }) => (
  <div>
    {touched && error && (<p>Main content is {error}</p>)}
    <RichTextEditor
      value={input.value}
      title={title}
      onChange={e => { input.onChange(e) }}
      {...props}
    />
  </div>
);

bodyMainRTE.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired,
  title: PropTypes.string
}

export class NewsArticleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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

        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>

          <div className='col-clear' />

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

          <div className="row-large cols-container">
            <Field
              name='bodyMain'
              title="Copy"
              component={bodyMainRTE}
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
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  formValues: PropTypes.object,
  onSubmitForm: PropTypes.func.isRequired,
  location: PropTypes.object
};

let InitFromStateForm = reduxForm({
  form: NEWS_ARTICLE_FORM,
  enableReinitialize : true
})(NewsArticleForm);

InitFromStateForm = connect(
  (state, props) => ({
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
  })
)(InitFromStateForm);

const mapStateToProps = (state) => ({
  formValues: selectNewsArticleFormValues(state)
});

export default connect(mapStateToProps, {})(InitFromStateForm)
