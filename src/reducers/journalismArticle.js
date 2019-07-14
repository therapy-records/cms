import {
  SET_SELECTED_JOURNALISM_ARTICLE,
  SET_SELECTED_JOURNALISM_ARTICLE_DELETED,
  DESTROY_SELECTED_JOURNALISM_ARTICLE,
  DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS,
  DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR
} from '../constants/actions';

export const INITIAL_STATE = {};

/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [SET_SELECTED_JOURNALISM_ARTICLE]: (state, action) => state = action.payload,
  [SET_SELECTED_JOURNALISM_ARTICLE_DELETED]: (state, action) => state = action.payload,
  [DESTROY_SELECTED_JOURNALISM_ARTICLE]: (state, action) => state = action.payload,

  [DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS]: (state, action) => state = action.payload,
  [DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR]: (state, action) => state = action.payload

}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------

export default function selectedJournalismArticleReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
