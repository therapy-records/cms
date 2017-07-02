import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import DropzoneImageUpload from './DropzoneImageUpload';

const CLOUDINARY_UPLOAD_PRESET_ID = 'gflm7wbr';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dpv2k0qsj/upload';

export class DropzoneNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  // todo: redux, promisify
  uploadSingleImage(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET_ID)
                        .field('file', file);
    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          items: [...this.state.items, ...[response.body.secure_url] ]
        });
      }
    });
  }

  handleImageUpload(files) {
    files.forEach((f) => this.uploadSingleImage(f));
  }

  render(){
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
        <Dropzone
          name={input.name}
          onDrop={this.handleImageUpload.bind(this)}
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

        {(multiple && items && items.length) && 
          <ul>
            {items.map((i) => (
              <li key={i} className={i === 3 ? 'col-33 col-clear no-list-style gallery-image-upload-item' : 'col-33 no-list-style gallery-image-upload-item'}>
                <img src={i} />
              </li>
            ))}
          </ul> 
        }
      </div>
    )
  }
}

export default DropzoneNew;
