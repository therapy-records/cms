import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import './RichTextEditor.css'

const RTE_TOOLBAR_CONFIG = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'blockquote', style: 'blockquote' }
  ]
};

class _RichTextEditor extends React.Component {
  constructor(props){
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      value: this.props.input.value ?
        RichTextEditor.createValueFromString(this.props.input.value, 'html') :
        RichTextEditor.createValueFromString('', 'html')
    }
  }

  handleOnChange(value){
    const {onChange} = this.props.input;

    this.setState({ value });
    if (onChange) {
      onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const {
      title,
      meta
    } = this.props;

    const {touched, error} = meta;

    return (
      <div>

      {title && <h5>{title}<span className='required'>*</span></h5>}

      {touched && error && (<p>Copy is {error}</p>)}

        <RichTextEditor
          toolbarConfig={RTE_TOOLBAR_CONFIG}
          value={this.state.value}
          placeholder='This month has been fantastic...'
          onChange={this.handleOnChange}
        />

      </div>
    );
  }
}

_RichTextEditor.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  title: PropTypes.string
}

export default _RichTextEditor;
