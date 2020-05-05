import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import InputMoment from 'input-moment';
import { isEmptyString } from '../../utils/strings';
import './InputMoment.css';

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    let initTimeFromProps = (props.initTime && !isEmptyString(props.initTime)) && moment(props.initTime);
    if (props.value) {
      initTimeFromProps = moment(new Date(props.value));
    }

    const newTime = moment();
    newTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

    this.state = {
      m: initTimeFromProps || newTime
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      initTime,
      input,
      onChange
    } = this.props;

    if (!initTime) {
      if (input && input.onChange) {
        input.onChange(this.state.m);
      } else if (onChange) {
        onChange(
          this.state.m
        );
      }
    }
  }

  handleChange(e) {
    const {
      input,
      onChange
    } = this.props;

    this.setState({ m: e });

    if (input && input.onChange) {
      input.onChange(moment(e).toISOString());
    } else if (onChange) {
      onChange(
        moment(e).toISOString()
      );
    }
  }

  render() {
    const {
      input,
      initTime,
      title,
      name,
      showSingleHiddenInputValue,
      showTime
    } = this.props;

    const { m } = this.state;

    const _moment = m;

    return (
      <div className={showTime ? 'datepicker render-time' : 'datepicker'}>

        {title && (
          <div>
            <h5>{title}</h5>
          </div>
        )}

        <div>
          <InputMoment
            {...input}
            moment={initTime ? moment(initTime) : _moment}
            onChange={this.handleChange}
            minStep={15}
          />
        </div>

        {showSingleHiddenInputValue &&
          <input
            type='hidden'
            name={name}
            value={initTime ? moment(initTime).toISOString() : moment(_moment).toISOString()}
          />
        }
      </div>
    );
  }
}

Datepicker.propTypes = {
  input: PropTypes.object,
  initTime: PropTypes.any,
  title: PropTypes.string,
  onChange: PropTypes.func,
  showSingleHiddenInputValue: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  showTime: PropTypes.bool
};

Datepicker.defaultProps = {
  initTime: '',
  title: '',
  onChange: null,
  showSingleHiddenInputValue: false,
  name: '',
  value: '',
  showTime: false
};

export default Datepicker;
