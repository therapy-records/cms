import { createSelector } from 'reselect'

export const selectNewsPostForm = (state) => state.form.NEWS_POST_FORM;

export const selectNewsPostFormValues = createSelector(
  selectNewsPostForm,
  (form) => form && form.values
);

export const selectNewsPostFormSyncErrors = createSelector(
  selectNewsPostForm,
  (form) => form.syncErrors && form.syncErrors || false
);
