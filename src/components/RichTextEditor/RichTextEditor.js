import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import './RichTextEditor.css'
import { isAString } from '../../utils/strings';

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
    const initValue = (this.props.input && this.props.input.value) || this.props.value;
    this.state = {
      value: initValue ?
        RichTextEditor.createValueFromString(initValue, 'html') :
        RichTextEditor.createValueFromString('', 'html')
    }
  }

  handleOnChange(value){
    const {
      input,
      onChange
    } = this.props;

    this.setState({ value });
    if (input && input.onChange) {
      input.onChange(
        value.toString('html')
      );
    } else if (onChange) {
      onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const {
      title,
      meta,
      name,
      showSingleHiddenInputValue
    } = this.props;

    const stateValueAsHtml = this.state.value.toString('html');
    const renderHiddenInput = (showSingleHiddenInputValue &&
                              isAString(stateValueAsHtml));

    const metaError = meta && meta.touched && meta.error;

    return (
      <div>

        {title && <h5>{title}<span className='required'>*</span></h5>}

        {metaError && (
          <span className='form-error'>Copy is {metaError}</span>
        )}

        <div className='react-rte-container'>
          <RichTextEditor
            toolbarConfig={RTE_TOOLBAR_CONFIG}
            value={this.state.value}
            placeholder='This month has been fantastic...'
            onChange={this.handleOnChange}
          />
        </div>

        {renderHiddenInput &&
          <input
            type='hidden'
            name={name}
            value={stateValueAsHtml}
          />
        }

      </div>
    );
  }
}

_RichTextEditor.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  value: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  showSingleHiddenInputValue: PropTypes.bool
};

_RichTextEditor.defaultProps = {
  input: {},
  meta: {},
  value: '',
  title: '',
  onChange: () => {},
  name: '',
  showSingleHiddenInputValue: false
};

export default _RichTextEditor;
