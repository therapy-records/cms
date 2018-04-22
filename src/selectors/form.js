/* eslint-disable no-mixed-operators */

import { createSelector } from 'reselect'

export const selectNewsArticleForm = (state) => state.form.NEWS_ARTICLE_FORM;

export const selectNewsArticleFormValues = createSelector(
  selectNewsArticleForm,
  (form) => form && form.values
);

export const selectNewsArticleFormSyncErrors = createSelector(
  selectNewsArticleForm,
  (form) => form.syncErrors && form.syncErrors || false
);

export const selectOtherWorkArticleFormValues = (state) => state.form.OTHER_WORK_ARTICLE_FORM;

export const selectOtherWorkArticleFormValuesValues = createSelector(
  selectOtherWorkArticleFormValues,
  (form) => form && form.values
);

export const selectOtherWorkArticleFormValuesSyncErrors = createSelector(
  selectOtherWorkArticleFormValues,
  (form) => form.syncErrors && form.syncErrors || false
);

/* eslint-enable no-mixed-operators */
