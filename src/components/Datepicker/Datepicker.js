import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import InputMoment from 'input-moment'
import './InputMoment.scss'

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: props.pickerActive
    }
  }

  handleTogglePicker = () => {
    this.setState({
      pickerActive: !this.state.pickerActive
    });
  }

  componentDidUpdate() {
    // ensure we send empty string back to form
    if (this.state.pickerActive === false) {
      this.props.input.onChange('');
    }
  }

  render() {
    const {
      input,
      props,
      meta: { touched, error },
      togglePicker
    } = this.props;

    const {
      pickerActive
    } = this.state;
    
    return (
      <div>
      {togglePicker ? (
        <div>
          <button onClick={this.handleTogglePicker}
                  className='btn-sm'
                  style={{ width: 'auto' }}>Schedule post
          </button>
          <br />
          <br />
          {(
            pickerActive &&
              <InputMoment
                {...input}
                moment={moment()}
                onChange={e => { input.onChange(moment(e).format()) }}
              />
          )}
        </div>
      ) : (
        <InputMoment
          {...input}
          moment={moment()}
          onChange={e => { input.onChange(moment(e).format()) }}
        />
      )}
        
      </div>
    );
  };
}

Datepicker.propTypes = {
  input: PropTypes.object.isRequired,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired,
  togglePicker: PropTypes.bool
}

export default Datepicker;
