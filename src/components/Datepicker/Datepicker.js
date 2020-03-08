import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import InputMoment from 'input-moment';
import { isEmptyString } from '../../utils/strings';
import './InputMoment.css';

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    let initTime = (props.initTime && !isEmptyString(props.initTime)) && moment(props.initTime);
    if (props.value) {
      initTime = moment(new Date(props.value));
    }

    this.state = {
      m: initTime || moment()
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
      showSingleHiddenInputValue
    } = this.props;

    const { m } = this.state;

    const _moment = m;

    return (
      <div className='datepicker'>
        <div>
          <h5>{title}</h5>
        </div>
        <div>
          <InputMoment
            {...input}
            moment={initTime ? moment(initTime) : _moment}
            onChange={this.handleChange}
          />
        </div>

        {showSingleHiddenInputValue &&
          <input
            type='hidden'
            name={name}
            value={initTime ? moment(initTime).toISOString() : moment(m).toISOString()}
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
  value: PropTypes.string
};

Datepicker.defaultProps = {
  initTime: '',
  title: '',
  onChange: null,
  showSingleHiddenInputValue: false,
  name: '',
  value: ''
};

export default Datepicker;
