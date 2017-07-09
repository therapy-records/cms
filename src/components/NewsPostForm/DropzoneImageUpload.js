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

  // todo: redux, promisify
  uploadSingleImage(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET_ID)
                        .field('file', file);
    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        if (this.props.multiple === true) {
          this.setState({
            items: [ ...this.state.items, ...[response.body.secure_url] ]
          });
          this.props.input.onChange(this.state.items);
        } else {
          this.setState({
            singleItem: response.body.secure_url
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

  handleImageUpload(files) {
    files.forEach((f) => this.uploadSingleImage(f));
  }

  handleOnDrop(files) {
    this.handleImageUpload(files)
  }

  render() {
    const {
      input,
      title,
      multiple
    } = this.props;
    const {
      items
    } = this.state;

    return (
      <div>
        <p><b>{title}</b></p>
        <div className={multiple && 'cols-container'}>

          <div className={multiple && 'col-1'}>
            <Dropzone
              name={input.name}
              onDrop={this.handleOnDrop}
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
              {(!multiple && items.length) &&
                <img src={items[0]} />
              }
            </Dropzone>
          </div>

          <div className={multiple && 'col-2'}>
            {(multiple && items && items.length) &&
              <ul className='flex-root'>
                {items.map((i) => (
                  <li key={i} className='col-50 no-list-style gallery-image-upload-item'>
                    <img src={i} />
                  </li>
                ))}
              </ul>
            }
          </div>

        </div>
      </div>
    )
  }
}

DropzoneImageUpload.propTypes = {
  input: PropTypes.object.isRequired,
  title: PropTypes.string,
  multiple: PropTypes.bool
};

export default DropzoneImageUpload;
