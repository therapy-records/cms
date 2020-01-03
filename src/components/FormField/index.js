import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';
import DropzoneImageUpload from '../DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';

const FormField = ({
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
  onChange
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
      />
    )
  } else if (component === 'RichTextEditor') {
    return (
      <RichTextEditor
        title={title}
        name={id}
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
        />
      )
    }
    return (
      <TextInputsList
        heading={heading}
        items={items}
        name={id}
      />
    )
  }
  return null;
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
  onChange: PropTypes.func
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
  onChange: () => {}
};

export default FormField;
