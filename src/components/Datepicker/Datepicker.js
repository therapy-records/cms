import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import InputMoment from 'input-moment'
import './InputMoment.scss'

export class Datepicker extends React.Component {
  render() {
    const {
      input,
      type,
      props,
      meta: { touched, error }
    } = this.props;
    return (
      <InputMoment
        {...input}
        moment={moment()}
        onChange={e => { input.onChange(moment(e).format()) }}
      />
    );
  };
}

Datepicker.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  props: PropTypes.object,
  meta: PropTypes.object.isRequired
}

export default Datepicker;
