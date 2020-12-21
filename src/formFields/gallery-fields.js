import GalleryImageUploadList from '../components/GalleryImageUploadList';

// This works for both multiple images and a single image
export const GALLERY_FIELDS_MULTIPLE = [
  {
    id: 'image',
    type: 'arrayOfObjects',
    component: 'ImageUpload',
    label: 'Images',
    required: true,
    ctaCopy: 'Drag & drop images',
    minImageDimensions: {
      width: 250,
      height: 250
    },
    helpText: 'helpText TODO',
    multipleImages: true,
    imageUploadListItemComponent: GalleryImageUploadList
  }
];

export const galleryFieldsMultiple = (collaboratorsInImage) => {
  const fields = GALLERY_FIELDS_MULTIPLE;

  if (collaboratorsInImage) {
    if (collaboratorsInImage && collaboratorsInImage.length) {
      const mapped = collaboratorsInImage.map((option) => {
        return {
          label: option.name,
          value: option._id
        };
      });

      fields[0].options = mapped;
    }
  }

  return fields;
};

export const GALLERY_FIELDS_EDIT_SINGLE = [
  {
    id: 'image',
    type: 'imageObject',
    component: 'ImageUpload',
    label: 'Image',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 250,
      height: 250
    },
    helpText: 'helpText TODO',
    multipleImages: false
  },
  {
    id: 'description',
    type: 'text',
    component: 'TextInput',
    label: 'The description',
    required: true
  },
  {
    id: 'collaboratorsInImage',
    type: 'arrayOfSomething',
    component: 'SelectSearch',
    label: 'Who is in this image?'
  }
];

export const galleryFieldsEditSingle = (entityData) => {
  const fields = GALLERY_FIELDS_EDIT_SINGLE;

  if (entityData) {
    const {
      collaborators,
      collaboratorsInImage
    } = entityData;
    const collaboratorsInImageField = fields.find((f) => f.id === 'collaboratorsInImage');
    const collaboratorsInImageFieldIndex = fields.indexOf(collaboratorsInImageField);

    if (collaboratorsInImage && collaboratorsInImage.length) {
      const mapped = collaboratorsInImage.map((option) => {
        return {
          label: option.name,
          value: option._id
        };
      });

      fields[collaboratorsInImageFieldIndex].defaultOptions = mapped;
    }

    if (collaborators && collaborators.length) {
      const mapped = collaborators.map((option) => {
        return {
          label: option.name,
          value: option._id
        };
      });

      fields[collaboratorsInImageFieldIndex].options = mapped;
    }
  }

  return fields;
};
