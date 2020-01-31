const COLLABORATOR_FIELDS = [
  {
    id: 'name',
    type: 'text',
    component: 'TextInput',
    label: 'Name',
    placeholder: 'Phil Collins',
    required: true
  },
  {
    id: 'role',
    type: 'text',
    component: 'TextInput',
    label: 'What they do',
    placeholder: 'e.g Saxophonist',
    required: true
  },
  {
    id: 'about',
    type: 'text',
    component: 'RichTextEditor',
    title: 'About',
    required: true,
    placeholder: 'Born and raised in...'
  },
  {
    id: 'avatarUrl',
    type: 'text',
    component: 'ImageUpload',
    label: 'Avatar',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 250,
      height: 250
    },
    helpText: 'must be at least 250px by 250px'
  },
  {
    id: 'collabOn',
    type: 'arrayOfStrings',
    component: 'TextInputsList',
    fieldsetLegend: 'Collaborated on',
    items: [
      { value: '' },
      { value: '' }
    ]
  },
  {
    id: 'urls',
    type: 'arrayOfObjects',
    component: 'TextInputsList',
    heading: 'Links',
    items: [
      {
        label: 'Website',
        id: 'website',
        type: 'text',
        value: '',
        placeholder: 'http://collaborator.com'
      },
      {
        label: 'Facebook',
        id: 'facebook',
        type: 'text',
        value: '',
        placeholder: 'http://facebook.com/example'
      },
      {
        label: 'Twitter',
        id: 'twitter',
        type: 'text',
        value: '',
        placeholder: 'http://twitter.com/example'
      },
      {
        label: 'Instagram',
        id: 'instagram',
        type: 'text',
        value: '',
        placeholder: 'http://instagram.com/example'
      },
      {
        label: 'SoundCloud',
        id: 'soundcloud',
        type: 'text',
        value: '',
        placeholder: 'http://soundcloud.com/example'
      },
      {
        label: 'Bandcamp',
        id: 'bandcamp',
        type: 'text',
        value: '',
        placeholder: 'https://bandcamp.com'
      },
      {
        label: 'Bio',
        id: 'bio',
        type: 'text',
        value: '',
        placeholder: 'http://website.com/example'
      },
      {
        label: 'Email',
        id: 'email',
        type: 'email',
        value: '',
        placeholder: 'example@collaborator.com'
      },
      {
        label: 'Phone',
        id: 'phone',
        type: 'tel',
        value: '',
        placeholder: '+441234567890'
      }
    ]
  }
]

export default COLLABORATOR_FIELDS;
