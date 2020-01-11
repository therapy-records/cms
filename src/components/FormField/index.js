import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import FormFieldLabel from './FormFieldLabel';
import FieldsetLegend from './FieldsetLegend';

const FormField = props => {
  const {
    id,
    label,
    required,
    fieldsetLegend,
    touched,
    error
  } = props;

  return (
    <div>

      {fieldsetLegend ? (
        <FieldsetLegend
          id={id}
          legend={fieldsetLegend}
          required={required}
        />
      ): (
        <FormFieldLabel
          id={id}
          label={label}
          required={required}
        />
      )}

      <FormInput {...props} />

      {touched && error && <span className='form-error'>{error}</span>}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  component: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  heading: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  ctaCopy: PropTypes.string,
  minImageDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  fieldsetLegend: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  dirty: PropTypes.bool
};

FormField.defaultProps = {
  label: '',
  title: '',
  heading: '',
  placeholder: '',
  required: false,
  ctaCopy: '',
  minImageDimensions: {},
  fieldsetLegend: '',
  items: [],
  onChange: () => {},
  error: '',
  touched: false,
  dirty: false
};

export default FormField;
