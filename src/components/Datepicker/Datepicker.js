import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import InputMoment from 'input-moment'
import './InputMoment.scss'

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    const initTime = props.initTime && moment(props.initTime);
    this.state = {
      pickerActive: props.pickerActive,
      m: initTime || moment()
    }
  }

  handleTogglePicker = () => {
    const initTime = this.props.initTime && moment(this.props.initTime);
    this.setState({
      pickerActive: !this.state.pickerActive,
      m: initTime || this.state.moment
    });
  }

  handleChange = e => {
    this.setState({ m: e });
    this.props.input.onChange(moment(e).toISOString())
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
      titleSub,
      titleSub2
    } = this.props;

    const {
      m,
      pickerActive
    } = this.state;

    const _moment = m;
    const renderColLayout = titleSub && titleSub2;

    return (
      <div className={renderColLayout ? 'cols-container' : 'max-width-50'}>
        <div>
          <h5>{title}</h5>
          {titleSub && <p>{titleSub}</p>}
          {titleSub2 && <p>{titleSub2}</p>}
        </div>
        <div>
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
  titleSub: PropTypes.string,
  titleSub2: PropTypes.string
}

export default Datepicker;
