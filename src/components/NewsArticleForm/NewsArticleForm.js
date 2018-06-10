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
  // selectSelectedNewsArticleScheduledTime,
  selectSelectedNewsArticleSocialShareHashtags
} from '../../selectors/news';
import { selectNewsArticleFormValues } from '../../selectors/form';
import './NewsArticleForm.css';
import DropzoneImageUpload from './DropzoneImageUpload';
// import Datepicker from '../Datepicker/Datepicker';
import Quotes from './Quotes';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import TextInput from '../../components/TextInput';
import { required } from '../../utils/form';
import { NEWS_ARTICLE_FORM } from '../../constants';

export const NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS = {
  width: 450,
  height: 450
};

export const bodyMainRTE = ({ input, onChange, props, meta: { touched, error } }) => (
  <div>
    {touched && error && (<p>Main content is {error}</p>)}
    <RichTextEditor value={input.value} onChange={e => { input.onChange(e) }} {...props} />
  </div>
);

bodyMainRTE.propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired
}

export class NewsArticleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSecondaryImageField: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSecondaryImageToggle = this.handleSecondaryImageToggle.bind(this)
    
  }

  handleSubmit() {
    // if (this.props.formValues.scheduledTime) {
    //   this.props.onSubmitFormQueue();
    // } else {
    //   this.props.onSubmitForm();
    // }
    this.props.onSubmitForm();
  }

  handleSecondaryImageToggle() {
    this.setState({ showSecondaryImageField: !this.state.showSecondaryImageField })
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

    const {
      showSecondaryImageField
    } = this.state;

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
            <Field name='title'
                  component={TextInput}
                  type='text'
                  placeholder='Hello World'
                  label='Title'
                  validate={required}
                  required
            />
          </div>

          <div className='row-large'>
            <Field
              name='bodyMain'
              component={bodyMainRTE}
              validate={required}
              required
            />
          </div>

          <div className='row-large'>
            <div className='cols-container'>

              <div>
                <Field name='mainImage.url'
                  title='Image'
                  component={DropzoneImageUpload}
                  existingImage={formValues && formValues.mainImage && formValues.mainImage.url}
                  minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
                />
              </div>

              <div>
                {showSecondaryImageField ?
                  <Field name='secondaryImageUrl'
                         component={DropzoneImageUpload}
                         title='Second image'
                         minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
                  />
                : 
                  <div className='secondary-image-toggle-container'>
                    <button
                      type='button'
                      onClick={this.handleSecondaryImageToggle}
                      className='btn-sm secondary-img-toggle'
                    >Add second image
                    </button>
                  </div>
                }
              </div>

            </div>
          </div>

          <div className='row-large'>
            <div className='cols-container links-cols-container'>
              <div className='col-50'>
                <Field name='mainImage.externalLink'
                      component={TextInput}
                      type='url'
                      title='Image link'
                      label='Image link'
                      placeholder='http://bbc.co.uk/fiona-ross'
                />
              </div>
              <div className='col-50' />
            </div>
          </div>

          <div className='row-large'>
            <div className='cols-container links-cols-container'>
              <div className='col-50'>
                <Field name='ticketsLink'
                      component={TextInput}
                      type='text'
                      placeholder='http://www...'
                      label='Tickets '
                      smallLabelSize
                />

                <br />

                <Field name='venueLink'
                      component={TextInput}
                      type='text'
                      placeholder='http://www...'
                      label='Venue'
                      smallLabelSize
                />
              </div>

              <div className='col-50'>
                <Field name='videoEmbed'
                      component={TextInput}
                      type='text'
                      placeholder='https://www.youtube.com/embed/45JLCGLplvk'
                      label='YouTube video'
                      smallLabelSize
                />

                <br />

                <Field name='socialShare.hashtags'
                      component={TextInput}
                      type='text'
                      placeholder='trending, happy, fionaross'
                      label='Hashtags'
                      smallLabelSize
                />
              </div>
            </div>

          </div>

          <div className='row-large'>
            <Field name='quotes'
                   component={Quotes} />
          </div>


          <div className='row-large'>
            <Field name='miniGalleryImages'
                   component={DropzoneImageUpload}
                   title='Mini gallery images'
                   multiple
                   existingMiniGalleryImages={formValues && formValues.miniGalleryImages}
            />
          </div>

          {/*
            <Field name='scheduledTime'
                component={Datepicker}
                initTime={formValues && formValues.scheduledTime}
                title='Scheduler (optional)'
                titleSub='Post live on a date of choosing'
                titleSub2='NOTE: This is an alpha version. Time of posting is not exact and could be offset.' />
          */}
          {error && <p>{error}</p>}


          <div className='row-large'>
            <button type='submit'
                    className='btn-lg btn-submit'
                    disabled={error || pristine || submitting || error || invalid}
                    onClick={() => this.handleSubmit()}
                    >Submit
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
  // onSubmitFormQueue: PropTypes.func.isRequired,
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
      // scheduledTime: selectSelectedNewsArticleScheduledTime(state),
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
