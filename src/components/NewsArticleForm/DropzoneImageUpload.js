import React from 'react';
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone';
import request from 'superagent';
import LoadingSpinner from '../LoadingSpinner';
import './styles.css';

const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

export class DropzoneImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      singleItem: '',
      invalidDimensions: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const {existingImage} = this.props;
    if (existingImage) {
      this.setState({
        singleItem: existingImage
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.existingImage) {
      this.setState({
        singleItem: props.existingImage
      });
    }
    if (props.existingMiniGalleryImages) {
      this.setState({
        items: props.existingMiniGalleryImages
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
          if (this.props.multiple === true) {
            this.setState({
              items: [
                ...this.state.items,
                ...[this.handleImageResponseUrl(response.body.secure_url)]
              ],
              isLoading: false
            });
            this.props.input.onChange(this.state.items);
          } else {
            this.setState({
              singleItem: this.handleImageResponseUrl(response.body.secure_url),
              isLoading: false
            });
            this.props.input.onChange(this.state.singleItem);
          }
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
      if (err) {
        this.setState({
          singleItem: `Sorry, error ${err}`
        });
      }
    });
  }

  handleOnDrop(files) {
    files.forEach((f) => this.uploadSingleImage(f));
  }

  render() {
    const {
      input,
      title,
      multiple,
      minImageDimensions
    } = this.props;

    const {
      items,
      singleItem,
      invalidDimensions,
      isLoading
    } = this.state;

    return (
      <div>
        <h5>{title}</h5>

        <div className={multiple && 'cols-container'}>

          <div className={multiple && 'col-1'}>
            <Dropzone
              name={input.name}
              onDrop={this.handleOnDrop.bind(this)} // eslint-disable-line
              className={isLoading ? 'dropzone dropzone-active' : `dropzone ${singleItem && 'dropzone-existing-image'}`}
              activeClassName='dropzone-active'
              multiple={multiple}
            >
              {(!multiple && !items.length)
                ? <div className='dropzone-cta'>
                  <span>Drag &amp; drop</span>
                  <div className={isLoading ? 'dropzone-loading dropzone-loading-active' : 'dropzone-loading'}>
                    <LoadingSpinner />
                  </div>
                </div>
                : null}

              {multiple
                ? <div className='dropzone-cta'>
                  <span>Drag &amp; drop multiple</span>
                  <div className={isLoading ? 'dropzone-loading dropzone-loading-active' : 'dropzone-loading'}>
                    <LoadingSpinner />
                  </div>
                </div>
                : null}

              {singleItem && <img src={singleItem} alt='Upload preview' />}

              {(!multiple && items.length) ?
                <img src={items[0]} /> // eslint-disable-line
              : null}

            </Dropzone>

            {minImageDimensions &&
              <p className='dropzone-image-dimension-notice'>Image must be at least {minImageDimensions.width}px by {minImageDimensions.height}px</p>
            }

          </div>

          {invalidDimensions.length
            ? <ul className="dropzone-dimensions-messages cancel-margin">
              {invalidDimensions.map((message, index) =>
                <li
                  key={index}
                  className={index === 0 && 'form-error'}
                >
                  {message}
                </li>
              )}
            </ul>
            : null}

          {multiple &&
            <div className='col-2 gallery-images-col-2'>
              {(multiple && items && items.length)
                ? <ul className='flex-root gallery-images-flex-root cancel-margin'>
                  {items.map((i) => (
                    <li key={i} className='col-50 no-list-style gallery-image-upload-item'>
                      <img src={i} alt={`gallery item ${i + 1}`} />
                    </li>
                  ))}
                </ul>
                : null}
            </div>
          }

        </div>
      </div>
    )
  }
}

DropzoneImageUpload.propTypes = {
  input: PropTypes.object.isRequired,
  title: PropTypes.string,
  multiple: PropTypes.bool,
  existingImage: PropTypes.string,
  existingMiniGalleryImages: PropTypes.array,
  minImageDimensions: PropTypes.object
};

DropzoneImageUpload.defaultProps = {
  minImageDimensions: {}
};

export default DropzoneImageUpload;
