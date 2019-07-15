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

export const selectJournalismArticleForm = (state) => state.form.JOURNALISM_ARTICLE_FORM;

export const selectJournalismArticleFormValues = createSelector(
  selectJournalismArticleForm,
  (form) => form && form.values
);

export const selectJournalismArticleFormValuesSyncErrors = createSelector(
  selectJournalismArticleForm,
  (form) => form && form.syncErrors && form.syncErrors || false
);

/* eslint-enable no-mixed-operators */
