import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import './RichTextEditor.scss'

class _RichTextEditor extends React.Component {
  state = {
    value: RichTextEditor.createValueFromString(this.props.value, 'html')
  }
  onChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render() {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange} />
    );
  }
}

_RichTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default _RichTextEditor;
