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

export const selectOtherWorkArticleForm = (state) => state.form.OTHER_WORK_ARTICLE_FORM;

export const selectOtherWorkArticleFormValues = createSelector(
  selectOtherWorkArticleForm,
  (form) => form && form.values
);

export const selectOtherWorkArticleFormValuesSyncErrors = createSelector(
  selectOtherWorkArticleForm,
  (form) => form && form.syncErrors && form.syncErrors || false
);

/* eslint-enable no-mixed-operators */
