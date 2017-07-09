import { createSelector } from 'reselect'

export const selectNewsPostForm = (state) => state.form.NEWS_POST_FORM;

export const selectNewsPostFormValues = createSelector(
  selectNewsPostForm,
  (form) => form.values
);
