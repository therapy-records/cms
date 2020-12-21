import COLLABORATOR_FIELDS from './collaborator-fields';
import PRESS_FIELDS from './press-fields';
import GIG_FIELDS from './gig-fields'
import {
  galleryFieldsMultiple,
  galleryFieldsEditSingle
} from './gallery-fields';

class FormFields {
  constructor(data) {
    this.collaborator = COLLABORATOR_FIELDS;
    this.press = PRESS_FIELDS;
    this.gig = GIG_FIELDS;
    this.gallery = galleryFieldsMultiple(data);
    this.galleryEdit = galleryFieldsEditSingle(data);
  }
}

export default FormFields;
