import COLLABORATOR_FIELDS from './collaborator-fields';
import PRESS_FIELDS from './press-fields';
import GIG_FIELDS from './gig-fields'

class FormFields {
  constructor() {
    this.collaborator = COLLABORATOR_FIELDS;
    this.press = PRESS_FIELDS;
    this.gig = GIG_FIELDS;
  }
}

export default FormFields;
