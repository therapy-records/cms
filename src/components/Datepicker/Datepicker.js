import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import InputMoment from 'input-moment'
import './InputMoment.scss'

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerActive: props.pickerActive,
      m: props.initTime && moment(props.initTime) || moment()
    }
  }

  handleTogglePicker = () => {
    this.setState({
      pickerActive: !this.state.pickerActive,
      m: this.props.initTime && moment(this.props.initTime) || this.state.moment
    });
  }

  handleChange = e => {
    this.setState({ m: e });
    this.props.input.onChange(moment(e).format())
  };

  componentDidUpdate() {
    // ensure we send empty string back to form
    if (this.state.pickerActive === false) {
      this.props.input.onChange('');
    }
  }

  render() {
    const {
      input,
      togglePicker,
      initTime,
      title,
      titleSub
    } = this.props;

    const {
      m,
      pickerActive
    } = this.state;

    const _moment = m;

    return (
      <div>
        <p><strong>{title}</strong></p>
        <p>{titleSub}</p>
        <p><small>Note: Time of posting is not exact and could be offset by X hours</small></p>

        {togglePicker ? (
          <div>
            <button onClick={this.handleTogglePicker}
                    className='btn-sm'
                    style={{ width: 'auto' }}>Schedule article
            </button>
            <br />
            <br />
            {(
              pickerActive &&
                <InputMoment
                  {...input}
                  moment={_moment}
                  onChange={this.handleChange}
                />
            )}
          </div>
        ) : (
          <InputMoment
            {...input}
            moment={initTime ? moment(initTime) : _moment}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  };
}

Datepicker.propTypes = {
  input: PropTypes.object.isRequired,
  togglePicker: PropTypes.bool,
  pickerActive: PropTypes.bool,
  initTime: PropTypes.string,
  title: PropTypes.string,
  titleSub: PropTypes.string
}

export default Datepicker;
