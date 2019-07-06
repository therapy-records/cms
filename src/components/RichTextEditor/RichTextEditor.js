import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'
import './RichTextEditor.css'

class _RichTextEditor extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: this.props.value ?
        RichTextEditor.createValueFromString(this.props.value, 'html') :
        RichTextEditor.createValueFromString('', 'html')
    }
  }

  onChange(value){
    this.setState({ value });
    if (this.props.input.onChange) {
      this.props.input.onChange(
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

      {title && <h5>{title}</h5>}

      {touched && error && (<p>Main content is {error}</p>)}

        <RichTextEditor
          value={this.state.value}
          placeholder='This month has been fantastic...'
          onChange={this.onChange}
        />

      </div>
    );
  }
}

_RichTextEditor.propTypes = {
  // onChange: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  title: PropTypes.string
}

export default _RichTextEditor;
