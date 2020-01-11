import React from 'react';
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import LoadingSpinner from '../LoadingSpinner';
import './DropzoneImageUpload.css';

const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

export class DropzoneImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      invalidDimensions: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const {existingImages} = this.props;
    if (existingImages) {
      this.setState({
        images: [...existingImages]
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { existingImages } = this.props;
    if (prevProps.existingImages !== existingImages) {
      this.setState({
        images: [...existingImages]
      });
    }

  }

  handleImageResponseUrl(url) {
    return url.replace(/upload/, 'upload/c_limit,q_100,w_650');
  }

  validMinimumImageDimensions(image) {
    const { width, height } = image;
    const { minImageDimensions } = this.props;
    if (width >= minImageDimensions.width &&
       height >= minImageDimensions.height) {
      return true;
    }
    return false;
  }

  // todo: redux, promisify
  uploadSingleImage(file) {
    this.setState({
      invalidDimensions: [],
      isLoading: true
    });
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET_ID)
      .field('file', file);
    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        if (this.validMinimumImageDimensions(response.body)) {
          let updatedImagesArray = [];
          if (this.props.multiple) {
            updatedImagesArray = [
              ...this.state.images,
              ...[this.handleImageResponseUrl(response.body.secure_url)]
            ];
          } else {
            updatedImagesArray = [
              ...[this.handleImageResponseUrl(response.body.secure_url)]
            ]
          }
          this.setState({
            images: updatedImagesArray,
            isLoading: false
          }, () => {
            const { images } = this.state;
            const lastImageInState = images[images.length - 1];
            const imageIndex = images.indexOf(lastImageInState);
            if (this.props.input && this.props.input.onChange) {
              this.props.input.onChange(lastImageInState);
            } else if (this.props.onChange) {
              this.props.onChange(
                lastImageInState,
                imageIndex
              );
            }
          });
        } else {
          const message = {
            tooSmall: `Image too small (width: ${response.body.width} height: ${response.body.height})`,
            widthShouldBe: `Min width: ${this.props.minImageDimensions.width}`,
            heightShouldBe: `Min height: ${this.props.minImageDimensions.height}`
          };
          this.setState({
            invalidDimensions: [
              message.tooSmall,
              message.widthShouldBe,
              message.heightShouldBe
            ],
            isLoading: false
          });
        }
      }
      // if (err) {
      //   this.setState({
      //     images: `Sorry, error ${err}`
      //   });
      // }
    });
  }

  handleOnDrop(files) {
    files.forEach((f) => this.uploadSingleImage(f));
  }

  removeSingleImage(imageUrl) {
    const { images } = this.state;
    const updatedImages = images.filter((i) => i !== imageUrl);
    this.setState({
      images: updatedImages
    }, () => {
      const { images } = this.state;
      const lastImageInState = images[images.length - 1];
      const imageIndex = images.indexOf(lastImageInState);

      // if props.input.onChange, it's a single redux-form Field
      // if props.onRemove, it's a custom form field/array of images
      if (this.props.input && this.props.input.onChange) {
        this.props.input.onChange('');
      } else if (this.props.onRemove) {
        this.props.onRemove(imageIndex);
      }
    }) ;
  }

  render() {
    const {
      title,
      minImageDimensions,
      ctaCopy,
      required,
      inputProps,
      showSingleHiddenInputValue,
      multiple
    } = this.props;

    const {
      images,
      invalidDimensions,
      isLoading
    } = this.state;

    return (
      <div className='dropzone-container'>
        {title &&  (
          <h5>{title}
            {required && <span className='required'>*</span>}
            &nbsp;
            {minImageDimensions &&
              <span className='help-text'><small>(must be at least {minImageDimensions.width}px by {minImageDimensions.height}px)</small></span>
            }
          </h5>
        )}

        <div className='flex-root'>
          <div>
            <Dropzone
              onDrop={this.handleOnDrop.bind(this)} // eslint-disable-line
              className={isLoading ? 'dropzone dropzone-active' : `dropzone ${images && 'dropzone-existing-image'}`}
              activeClassName='dropzone-active'
              inputProps={inputProps}
              multiple={multiple}
            >
              <div className='dropzone-cta'>
                {ctaCopy ? <span>{ctaCopy}</span> : <span>Drag &amp; drop images</span>}
                <div className={isLoading ? 'dropzone-loading dropzone-loading-active' : 'dropzone-loading'}>
                  <LoadingSpinner />
                </div>
              </div>

            </Dropzone>
          </div>

          {(images && images.length) ?
            <div>
              <ul className='flex-root gallery-images-flex-root'>
                {images.map((i) => {
                  if (i.length) {
                    return (
                      <li key={i} className='col-50 no-list-style gallery-image-upload-item'>
                        <img src={i} alt={`image  ${i + 1}`} />
                        <button
                          type="button"
                          className="btn-danger btn-sm-remove"
                          onClick={() => this.removeSingleImage(i)}>
                          remove
                      </button>
                      </li>
                    )
                  }
                  return null;
                })}
              </ul>
              {showSingleHiddenInputValue &&
                <input
                  type='hidden'
                  value={images[images.length - 1]}
                  {...inputProps}
                />
              }

            </div>
          : null}
        </div>

        {invalidDimensions.length ?
          <ul className="dropzone-dimensions-messages cancel-margin">
            {invalidDimensions.map((message, index) =>
              <li
                key={index}
                className='form-error'
              >
                {message}
              </li>
            )}
          </ul>
        : null}

      </div>
    )
  }
}

DropzoneImageUpload.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func
  }),
  inputProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  existingImages: PropTypes.array,
  minImageDimensions: PropTypes.object,
  ctaCopy: PropTypes.string,
  showSingleHiddenInputValue: PropTypes.bool,
  multiple: PropTypes.bool
};

DropzoneImageUpload.defaultProps = {
  onChange: () => {},
  onRemove: () => { },
  input: {},
  required: false,
  existingImages: [],
  minImageDimensions: {},
  ctaCopy: '',
  inputProps: {},
  showSingleHiddenInputValue: false,
  multiple: true
};

export default DropzoneImageUpload;
