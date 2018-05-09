import React from 'react';
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

export class DropzoneImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      singleItem: ''
    };
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

  // todo: redux, promisify
  uploadSingleImage(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET_ID)
                        .field('file', file);
    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        if (this.props.multiple === true) {
          this.setState({
            items: [
              ...this.state.items,
              ...[this.handleImageResponseUrl(response.body.secure_url)]
            ]
          });
          this.props.input.onChange(this.state.items);
        } else {
          this.setState({
            singleItem: this.handleImageResponseUrl(response.body.secure_url)
          });
          this.props.input.onChange(this.state.singleItem);
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
      multiple
    } = this.props;

    const {
      items,
      singleItem
    } = this.state;

    return (
      <div>
        <h5>{title}</h5>
        <div className={multiple && 'cols-container'}>

          <div className={multiple && 'col-1'}>
            <Dropzone
              name={input.name}
              onDrop={this.handleOnDrop.bind(this)} // eslint-disable-line
              className='dropzone'
              activeClassName='dropzone-active'
              multiple={multiple}
            >
              {(!multiple && !items.length) &&
                <div className='dropzone-cta'>
                  <span>Drag &amp; drop</span>
                </div>
              }

              {multiple &&
                <div className='dropzone-cta'>
                  <span>Drag &amp; drop  multiple images</span>
                </div>
              }

              {singleItem && <img src={singleItem} alt='Upload preview' />}

              {(!multiple && items.length) &&
                <img src={items[0]} /> // eslint-disable-line
              }

            </Dropzone>
          </div>

          {multiple &&
            <div className='col-2 gallery-images-col-2'>
              {(multiple && items && items.length) &&
                <ul className='flex-root gallery-images-flex-root'>
                  {items.map((i) => (
                    <li key={i} className='col-50 no-list-style gallery-image-upload-item'>
                      <img src={i} alt={`gallery item ${i + 1}`} />
                    </li>
                  ))}
                </ul>
              }
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
  existingMiniGalleryImages: PropTypes.array
};

export default DropzoneImageUpload;
