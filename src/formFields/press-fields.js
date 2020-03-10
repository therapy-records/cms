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
  }
];

export default PRESS_FIELDS;
