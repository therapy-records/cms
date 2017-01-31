import React, { Component } from 'react'
import RichTextEditor from 'react-rte'
import './RichTextEditor.scss'

class _RichTextEditor extends Component {

  state = {
    value: RichTextEditor.createEmptyValue()
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

export default _RichTextEditor;