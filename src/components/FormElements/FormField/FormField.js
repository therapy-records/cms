import React from 'react';
import PropTypes from 'prop-types';
import FormFieldInput from '../FormFieldInput';
import FormFieldLabel from '../FormFieldLabel';
import FieldsetLegend from '../FieldsetLegend';
import FormFieldError from '../FormFieldError';

const FormField = props => {
  const {
    id,
    label,
    title,
    fieldsetLegend,
    helpText,
    required,
    touched,
    error
  } = props;

  return (
    <div>

      {/*
        NOTE:
        title is temporary and only used for RichTextEditor
        when TextEditor is upgraded (and uses semantic text input and label)
        this can be removed
      */}

      {title &&
        <h5>
          {title}
          {required && <span className='required'>*</span>}
        </h5>
      }

      {fieldsetLegend && (
        <FieldsetLegend
          id={id}
          legend={fieldsetLegend}
          required={required}
        />
      )}

      {label && (
        <FormFieldLabel
          id={id}
          label={label}
          required={required}
          helpText={helpText}
        />
      )}

      <FormFieldInput {...props} />

      {(touched && error) && (
        <FormFieldError
          error={error}
        />
      )}

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
  helpText: PropTypes.string,
  items: PropTypes.array,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  dirty: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      cloudinaryUrl: PropTypes.string,
      cloudinaryPublicId: PropTypes.string
    })
  ]),
  showTime: PropTypes.bool,
  imageUploadListItemComponent: PropTypes.func
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
  helpText: '',
  items: [],
  options: [],
  onChange: null,
  error: '',
  touched: false,
  dirty: false,
  value: '',
  showTime: false,
  imageUploadListItemComponent: null
};

export default FormField;
