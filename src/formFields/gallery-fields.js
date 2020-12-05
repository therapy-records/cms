import GalleryImageUploadList from '../components/GalleryImageUploadList';

export const GALLERY_SINGLE_FIELDS = [
  {
    id: 'image',
    type: 'arrayOfObjects',
    component: 'ImageUpload',
    label: 'Image',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 250,
      height: 250
    },
    helpText: 'helpText TODO',
    multipleImages: false,
    imageUploadListItemComponent: GalleryImageUploadList
  }
];

// TODO
// single gallery image
// default = multiple gallery images

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
]

export const galleryFieldsMultiple = (selectOptions) => {
  const result = GALLERY_FIELDS_MULTIPLE;

  if (selectOptions && selectOptions.length) {
    const mappedOptions = selectOptions.map((option) => {
      // TODO maybe should have name & _id removed?

      return {
        label: option.name,
        value: option._id
      };
    });

    result[0].options = mappedOptions;
  }

  return result;
}
