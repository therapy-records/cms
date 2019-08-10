import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import InputMoment from 'input-moment'
import './InputMoment.css'

export class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    const initTime = props.initTime && moment(props.initTime);
    this.state = {
      m: initTime || moment()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const {
      initTime,
      input
    } = this.props;
    
    if (!initTime) {
      input.onChange(this.state.m);
    }
  }

  handleChange(e) {
    this.setState({ m: e });
    this.props.input.onChange(moment(e).toISOString());
  }

  render() {
    const {
      input,
      initTime,
      title
    } = this.props;

    const { m } = this.state;

    const _moment = m;

    return (
      <div className='datepicker max-width-50'>
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
      </div>
    );
  }
}

Datepicker.propTypes = {
  input: PropTypes.object.isRequired,
  initTime: PropTypes.any,
  title: PropTypes.string
}

export default Datepicker;
