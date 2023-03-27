const PRESS_FIELDS = [
  {
    id: 'author',
    type: 'text',
    component: 'TextInput',
    label: 'Author',
    placeholder: 'Sky News',
    required: true
  },
  {
    id: 'category',
    type: 'select',
    component: 'Select',
    label: 'Category',
    options: [
      {
        text: 'Please select',
        value: null
      },
      {
        text: 'Reviews',
        value: 'Reviews'
      },
      {
        text: 'Interviews',
        value: 'Interviews'
      },
      {
        text: 'Other',
        value: 'Other'
      }
    ],
    required: true
  },
  {
    id: 'title',
    type: 'text',
    component: 'TextInput',
    label: 'Title',
    placeholder: 'An interview with Fiona Ross',
    required: true
  },
  {
    id: 'excerpt',
    type: 'text',
    component: 'TextArea',
    label: 'Excerpt',
    placeholder: 'Fiona has gone from strength to strength since...',
    required: true,
    maxLength: 150
  },
  {
    id: 'externalLink',
    type: 'text',
    component: 'TextInput',
    label: 'URL',
    placeholder: 'http://skynews.com/fiona-ross',
    required: true
  },
  {
    id: 'releaseDate',
    type: 'text',
    component: 'Datepicker',
    label: 'Release Date',
    required: true
  },
  {
    id: 'image',
    type: 'arrayOfObjects',
    component: 'ImageUpload',
    label: 'Image',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 400,
      height: 400
    },
    helpText: 'Must be at least 400px by 400px'
  }
];

export default PRESS_FIELDS;
