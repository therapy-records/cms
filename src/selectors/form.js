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
