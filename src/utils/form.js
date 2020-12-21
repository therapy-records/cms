import {
  isChildField,
  handleChildField
} from './form-field-child-handler';
import {
  isAnObject,
  objectHasValues
} from '../utils/objects';

// NOTE: remove in future, this is only used for redux-form fields.
export const required = value => {
  if ((!isAnObject(value) && value)
    || (isAnObject(value) && objectHasValues(value))) {
    return undefined;
  }
  return 'required';
};

const isAvatarField = (fieldId) => fieldId === 'avatar';

const isSingleImage = (fieldId) => isAvatarField(fieldId);

const isGalleryImagesField = (fieldId) => fieldId === 'galleryImages';

const handleFormData = form => {
  const data = new FormData(form);
  let postData = {};
  let fieldsWithChildren = {};

  const formFieldsArray = [];

  for (const pair of data.entries()) {
    const fieldId = pair[0];
    const fieldValue = pair[1];

    formFieldsArray.push({
      [fieldId]: fieldValue
    });

    if (isChildField(fieldId)) {
      fieldsWithChildren = handleChildField(
        fieldId,
        fieldValue,
        fieldsWithChildren
      );
    } else if (isSingleImage(fieldId)) {
      postData = {
        ...postData,
        [fieldId]: {
          ...fieldValue[0]
        }
      }
    } else if (isGalleryImagesField(fieldId)) {
      // galleryImages 'field' contains array of objects in the shape we want it,
      // no need for any other fields.
      postData = {
        images: JSON.parse(fieldValue)
      };
    } else {
      postData = {
        ...postData,
        [fieldId]: fieldValue
      }
    }

    if (!isGalleryImagesField(fieldId)) {
      postData = {
        ...postData,
        ...fieldsWithChildren
      }
    }
  }

  // when Form has Image Upload and we have collaboratorsInImage field(s)/value(s)
  // There is the possibility to get multiple collaboratorsInImage single values.
  // We need this to be an array of objects; so here we make that happen.
  // changes data from : { collaboratorsInImage: '1234' }, { collaboratorsInImage: '5678' }
  // to: collaboratorsInImage: [ '1234', '5678' ]
  //
  // This currently occurs only in Gallery Image Edit.
  // Not a great solution, but for now...
  // This stems from react-select package auto generating these hidden input values.
  const collaboratorsInImageFields = formFieldsArray.filter((obj) =>
    obj.collaboratorsInImage && obj.collaboratorsInImage.length
  );

  const collaboratorsInImageCount = collaboratorsInImageFields.length;

  const galleryImagesField = formFieldsArray.find((obj) =>
    obj.galleryImages && obj.galleryImages.length);

  // NOTE: galleryImages field is for Gallery Upload (not single Gallery image edit)
  // collaboratorsInImage does not need to be changed if we have galleryImages field
  // galleryImages field value contains all the required data.
  const shouldMapCollaboratorsInImageFields = (collaboratorsInImageCount >= 1
                                              && !galleryImagesField);

  if (shouldMapCollaboratorsInImageFields) {
    postData.collaboratorsInImage = [];

    collaboratorsInImageFields.forEach((collab) => {
      const collabId = collab.collaboratorsInImage;
      postData.collaboratorsInImage.push(collabId);
    });
  }

  return postData;
};

export default handleFormData;
