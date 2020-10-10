const GALLERY_FIELDS = [
  {
    id: 'image',
    type: 'arrayOfObjects',
    component: 'ImageUpload',
    label: 'Images',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 250,
      height: 250
    },
    helpText: 'helpText TODO'
  }
];

// TODO
// const GALLERY_FIELDS_MULTIPLE = [

// ]

export default GALLERY_FIELDS;
