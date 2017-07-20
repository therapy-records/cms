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
      moment: moment()
    }
  }

  handleTogglePicker = () => {
    this.setState({
      pickerActive: !this.state.pickerActive,
      moment: this.state.moment
    });
  }

  handleChange = e => {
    this.setState({ moment: e });
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
      togglePicker
    } = this.props;

    const {
      moment,
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
                  moment={moment}
                  onChange={this.handleChange}
                />
            )}
          </div>
        ) : (
          <InputMoment
            {...input}
            moment={moment}
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
  pickerActive: PropTypes.bool
}

export default Datepicker;
