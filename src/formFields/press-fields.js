import { PRESS_CATEGORIES } from '../constants';

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
    id: 'categoryId',
    type: 'select',
    component: 'Select',
    label: 'Category',
    options: [
      {
        text: 'Please select',
        value: null
      },
      {
        text: PRESS_CATEGORIES.REVIEWS.TEXT,
        value: PRESS_CATEGORIES.REVIEWS.VALUE
      },
      {
        text: PRESS_CATEGORIES.INTERVIEWS.TEXT,
        value: PRESS_CATEGORIES.INTERVIEWS.VALUE
      },
      {
        text: PRESS_CATEGORIES.OTHER.TEXT,
        value: PRESS_CATEGORIES.OTHER.VALUE
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
