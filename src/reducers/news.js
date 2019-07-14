import {
  FETCH_NEWS_ARTICLES_SUCCESS,
  POST_NEWS_FORM_SUCCESS
} from '../constants/actions';

/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [FETCH_NEWS_ARTICLES_SUCCESS]: (state, action) => {
    return {
      ...state,
      articles: action.payload,
      hasFetched: true
    }
  },
  [POST_NEWS_FORM_SUCCESS]: (state, action) => {
    let articlesArray = [
      action.payload
    ];
    if (state.articles) {
      articlesArray = [...state.articles, ...articlesArray]
    }
    return { ...state, articles: articlesArray }
  }
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasFetched: false,
  articles: null
};

export default function newsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
