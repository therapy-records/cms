const GIG_FIELDS = [
    {
      id: 'title',
      type: 'text',
      component: 'TextInput',
      label: 'Title',
      placeholder: 'Fiona Ross',
      required: true
    },
    {
      id: 'location',
      type: 'text',
      component: 'TextInput',
      label: 'Location',
      placeholder: 'London, UK',
      required: true
    },
    {
      id: 'venue',
      type: 'text',
      component: 'TextArea',
      label: 'Venue',
      placeholder: 'The O2 Arena..',
      required: true,
      maxLength: 150
    },
    {
      id: 'ticketsUrl',
      type: 'text',
      component: 'TextInput',
      label: 'Tickets URL (link)',
      placeholder: 'http://skynews.com/fiona-ross',
      required: true
    },
    {
      id: 'date',
      type: 'text',
      component: 'Datepicker',
      label: 'Date',
      required: true
    }
  ];
  
  export default GIG_FIELDS;
  