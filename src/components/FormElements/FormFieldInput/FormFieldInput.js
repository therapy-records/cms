import React from 'react';
import PropTypes from 'prop-types';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import TextInputsList from '../TextInputsList';
import ImageUploadContainer from '../../FormElements/ImageUpload/ImageUploadContainer';
import RichTextEditor from '../../RichTextEditor';
import Datepicker from '../../Datepicker';
import SelectSearch from '../SelectSearch';

const FormFieldInput = ({
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
  options,
  onChange,
  maxLength,
  value,
  multipleImages,
  showTime,
  imageUploadListItemComponent
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
  } else if (component === 'TextArea') {
    return (
      <TextArea
        placeholder={placeholder}
        label={label}
        name={id}
        required={required}
        onChange={onChange}
        maxLength={maxLength}
        value={value}
      />
    )
  } else if (component === 'RichTextEditor') {
    return (
      <RichTextEditor
        name={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        showSingleHiddenInputValue
      />
    )
  } else if (component === 'ImageUpload') {
    let existingImages;
    if (value && value.cloudinaryUrl) {
      existingImages = [ value ];
    } else {
      existingImages = [];
    }

    return (
      <ImageUploadContainer
        minImageDimensions={minImageDimensions}
        ctaCopy={ctaCopy}
        existingImages={existingImages}
        multiple={multipleImages}
        handleOnUpload={onChange}
        handleOnRemove={onChange}
        imageUploadListItemComponent={imageUploadListItemComponent}
        selectOptions={options}
      />

    )
  } else if (component === 'Datepicker') {
    return (
      <Datepicker
        onChange={onChange}
        name={id}
        value={value}
        showSingleHiddenInputValue
        showTime={showTime}
      />
    )
  } else if (component === 'SelectSearch') {
    return (
      <SelectSearch
        onChange={onChange}
        name={id}
        options={options}
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

FormFieldInput.propTypes = {
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
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      cloudinaryUrl: PropTypes.string,
      cloudinaryPublicId: PropTypes.string
    })
  ]),
  multipleImages: PropTypes.bool,
  showTime: PropTypes.bool,
  imageUploadListItemComponent: PropTypes.func
};

FormFieldInput.defaultProps = {
  label: '',
  title: '',
  heading: '',
  placeholder: '',
  required: false,
  ctaCopy: '',
  minImageDimensions: {},
  fieldsetLegend: '',
  items: [],
  options: [],
  onChange: null,
  maxLength: null,
  value: '',
  multipleImages: false,
  showTime: false,
  imageUploadListItemComponent: null
};

export default FormFieldInput;
