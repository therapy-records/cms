/* eslint-disable no-mixed-operators */

import { createSelector } from 'reselect'

export const selectNewsForm = (state) => state.form.NEWS_FORM;

export const selectNewsFormValues = createSelector(
  selectNewsForm,
  (form) => form && form.values
);

export const selectNewsFormSyncErrors = createSelector(
  selectNewsForm,
  (form) => form && form.syncErrors && form.syncErrors || false
);

export const selectJournalismForm = (state) => state.form.JOURNALISM_FORM;

export const selectJournalismFormValues = createSelector(
  selectJournalismForm,
  (form) => form && form.values
);

export const selectJournalismFormValuesSyncErrors = createSelector(
  selectJournalismForm,
  (form) => form && form.syncErrors && form.syncErrors || false
);

/* eslint-enable no-mixed-operators */
