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
    if (this.props.onChange) {
      this.props.onChange(
        value.toString('html')
      );
    }
  }

  render() {
    const {title} = this.props;

    return (
      <div>

      {title && <h5>{title}</h5>}

        <RichTextEditor
          value={this.state.value}
          placeholder='It was an honour to...'
          onChange={this.onChange}
        />

      </div>
    );
  }
}

_RichTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  title: PropTypes.string
}

export default _RichTextEditor;
