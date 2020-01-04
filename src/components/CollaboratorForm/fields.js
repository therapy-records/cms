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
    title: 'Avatar',
    required: true,
    ctaCopy: 'Drag & drop image',
    minImageDimensions: {
      width: 111,
      height: 111
    }
  },
  {
    id: 'collabOn',
    type: 'arrayOfStrings',
    component: 'TextInputsList',
    fieldsetLegend: 'Collaborated on',
    items: [
      { value: '' },
      { value: '' }
    ],
    required: true
  }
  // {
  //   id: 'urls',
  //   type: 'arrayOfObjects',
  //   component: 'TextInputsList',
  //   heading: 'URLs',
  //   items: [
  //     {
  //       label: 'Website',
  //       id: 'website',
  //       value: ''
  //     },
  //     {
  //       label: 'Facebook',
  //       id: 'facebook',
  //       value: ''
  //     },
  //     {
  //       label: 'Twitter',
  //       id: 'twitter',
  //       value: ''
  //     },
  //     {
  //       label: 'Instagram',
  //       id: 'instagram',
  //       value: ''
  //     },
  //     {
  //       label: 'SoundCloud',
  //       id: 'soundcloud',
  //       value: ''
  //     },
  //     {
  //       label: 'Bio',
  //       id: 'bio',
  //       value: ''
  //     },
  //     {
  //       label: 'Email',
  //       id: 'email',
  //       value: ''
  //     },
  //     {
  //       label: 'Phone',
  //       id: 'phone',
  //       value: ''
  //     }
  //   ]
  // }
]

export default COLLABORATOR_FIELDS;
