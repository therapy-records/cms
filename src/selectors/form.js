/* eslint-disable no-mixed-operators */

import { createSelector } from 'reselect'

export const selectNewsArticleForm = (state) => state.form.NEWS_ARTICLE_FORM;

export const selectNewsArticleFormValues = createSelector(
  selectNewsArticleForm,
  (form) => form && form.values
);

export const selectNewsArticleFormSyncErrors = createSelector(
  selectNewsArticleForm,
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
