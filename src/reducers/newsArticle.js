import { EMPTY_ARTICLE_SECTION_OBJ } from '../utils/news';
import {
  SET_SELECTED_NEWS_ARTICLE,
  SET_SELECTED_NEWS_ARTICLE_DELETED,
  DESTROY_SELECTED_NEWS_ARTICLE,
  DELETE_SINGLE_NEWS_ARTICLE_SUCCESS,
  DELETE_SINGLE_NEWS_ARTICLE_ERROR
} from '../constants/actions'

export const INITIAL_STATE = {
  sections: [
    EMPTY_ARTICLE_SECTION_OBJ
  ]
};

/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [SET_SELECTED_NEWS_ARTICLE]: (state, action) => state = action.payload,
  [SET_SELECTED_NEWS_ARTICLE_DELETED]: (state, action) => state = action.payload,
  [DESTROY_SELECTED_NEWS_ARTICLE]: (state, action) => state = action.payload,

  [DELETE_SINGLE_NEWS_ARTICLE_SUCCESS]: (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_ARTICLE_ERROR]: (state, action) => state = action.payload
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------

export default function selectedNewsArticleReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
