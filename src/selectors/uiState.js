import { createSelector } from 'reselect'

export const selectUiState = (state) => state.uiState;

export const selectUiStateLoading = createSelector(
  selectUiState,
  (uiState) => uiState && uiState.promiseLoading
);

export const selectUiStateSuccess = createSelector(
  selectUiState,
  (uiState) => uiState && uiState.promiseSuccess
);
