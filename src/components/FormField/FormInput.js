import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';
import DropzoneImageUpload from '../DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';

const FormInput = ({
  id,
  type,
  component,
  label,
  title,
  heading,
  placeholder,
  required,
  ctaCopy,
  minImageDimensions,
  fieldsetLegend,
  items,
  onChange,
  value
}) => {
  if (component === 'TextInput') {
    return (
      <TextInput
        type={type}
        placeholder={placeholder}
        label={label}
        name={id}
        required={required}
        onChange={onChange}
        value={value}
      />
    )
  } else if (component === 'RichTextEditor') {
    return (
      <RichTextEditor
        name={id}
        onChange={onChange}
        value={value}
        showSingleHiddenInputValue
      />
    )
  } else if (component === 'ImageUpload') {
    return (
      <DropzoneImageUpload
        title={title}
        component={DropzoneImageUpload}
        minImageDimensions={minImageDimensions}
        inputProps={{
          name: id
        }}
        showSingleHiddenInputValue
        multiple={false}
        ctaCopy={ctaCopy}
        onChange={onChange}
        existingImages={[value]}
      />
    )
  } else if (component === 'TextInputsList') {
    if (type === 'arrayOfStrings') {
      return (
        <TextInputsList
          fieldsetLegend={fieldsetLegend}
          items={items}
          name={id}
          showAddRemove
          onChange={onChange}
          required={required}
          value={value}
        />
      )
    }
    return (
      <TextInputsList
        heading={heading}
        items={items}
        name={id}
        onChange={onChange}
        required={required}
        value={value}
      />
    )
  }
  return null;
}

FormInput.propTypes = {
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
  value: PropTypes.string
};

FormInput.defaultProps = {
  label: '',
  title: '',
  heading: '',
  placeholder: '',
  required: false,
  ctaCopy: '',
  minImageDimensions: {},
  fieldsetLegend: '',
  items: [],
  onChange: () => { },
  value: ''
};

export default FormInput;
