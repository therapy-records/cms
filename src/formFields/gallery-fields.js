import GalleryImageUploadList from '../components/GalleryImageUploadList';
// const GALLERY_FIELDS = [
//   {
//     id: 'image',
//     type: 'arrayOfObjects',
//     component: 'ImageUpload',
//     label: 'Images',
//     required: true,
//     ctaCopy: 'Drag & drop image',
//     minImageDimensions: {
//       width: 250,
//       height: 250
//     },
//     helpText: 'helpText TODO'
//   }
// ];

// TODO
// single gallery image
// default = multiple gallery images

const GALLERY_FIELDS_MULTIPLE = [
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

export default GALLERY_FIELDS_MULTIPLE;
