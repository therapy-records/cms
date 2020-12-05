import COLLABORATOR_FIELDS from './collaborator-fields';
import PRESS_FIELDS from './press-fields';
import GIG_FIELDS from './gig-fields'
import {
  galleryFieldsMultiple,
  GALLERY_SINGLE_FIELDS
} from './gallery-fields';

class FormFields {
  constructor(selectOptions) {
    this.collaborator = COLLABORATOR_FIELDS;
    this.press = PRESS_FIELDS;
    this.gig = GIG_FIELDS;
    this.gallery = galleryFieldsMultiple(selectOptions);
    this.gallerySingle = GALLERY_SINGLE_FIELDS;
  }
}

export default FormFields;
