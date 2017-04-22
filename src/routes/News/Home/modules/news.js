import {
  API_ROOT,
  NEWS
} from '../../../../constants'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from '../../../../reducers/uiState';
export const FETCH_NEWS_POSTS = 'FETCH_NEWS_POSTS'
export const FETCH_NEWS_POSTS_SUCCESS = 'FETCH_NEWS_POSTS_SUCCESS'
export const FETCH_NEWS_POSTS_ERROR = 'FETCH_NEWS_POSTS_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

function success(data){
  return {
    type: FETCH_NEWS_POSTS_SUCCESS,
    payload: data
  }
}

function error(err){
  return {
    type: FETCH_NEWS_POSTS_ERROR,
    payload: getState().newsPosts
  }
}

export const fetchNews = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS)
      .then(res => res.json())
      .then(
        (data) => {
          // todo: clean news specific actions/state
          dispatch(success(data));
          setTimeout(() => {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess());
          }, 3000);
        },
        (err) => {
          // todo: clean news specific actions/state 
          dispatch(error(err));
          dispatch(promiseError(err));
        }
      );
    })
  }
}

export const actions = {
  fetchNews
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_NEWS_POSTS_SUCCESS] : (state, action) => state = action.payload,
  [FETCH_NEWS_POSTS_ERROR] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function newsPostsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
