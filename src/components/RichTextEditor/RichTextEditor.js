import React, { Component } from 'react'
import RichTextEditor from 'react-rte'
import './RichTextEditor.scss'

class _RichTextEditor extends React.Component {

  state = {
    value: RichTextEditor.createEmptyValue()
    // value: RichTextEditor.createValueFromString(this.props.initValue, 'html')
  }
  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        autoFocus/>
    );
  }
}


_RichTextEditor.propTypes = {
  onChange: React.PropTypes.func.isRequired
}


export default _RichTextEditor;
