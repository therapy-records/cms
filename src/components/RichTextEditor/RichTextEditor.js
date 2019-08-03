import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import './RichTextEditor.css'

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
