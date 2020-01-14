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
    label: 'Role',
    placeholder: 'e.g Saxophonist',
    required: true
  },
  {
    id: 'about',
    type: 'text',
    component: 'RichTextEditor',
    title: 'About',
    required: true
  },
  {
    id: 'avatarUrl',
    type: 'text',
    component: 'ImageUpload',
    label: 'Avatar',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 111,
      height: 111
    },
    helpText: 'must be at least 111px by 111px'
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
    heading: 'URLs',
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
