export const FETCH_NEWS_POSTS = 'FETCH_NEWS_POSTS';
export const FETCH_NEWS_POSTS_SUCCESS = 'FETCH_NEWS_POSTS_SUCCESS'
export const FETCH_NEWS_POSTS_ERROR = 'FETCH_NEWS_POSTS_ERROR'
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';
export const POST_NEWS_FORM_ERROR = 'POST_NEWS_FORM_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
/*
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
*/

export const fetchNews = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      fetch('http://localhost:4040/api/news')
      .then(res => res.json())
      .then(
        data => dispatch({
          type    : FETCH_NEWS_POSTS_SUCCESS,
          payload : data
        }),
        err => dispatch({
          type    : FETCH_NEWS_POSTS_ERROR,
          payload : getState().newsPosts
        })
      );
    })
  }
}

export const postNews = (data) => {
  return (dispatch, getState) => {
    const formObjFromStore = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return getState().form.NEWS_POST_FORM.values
      } else {
        return null;
      }
    }
    return new Promise((resolve) => {
      fetch('http://localhost:4040/api/news', {
          method: 'POST',
          body: formObjFromStore()
        }
      )
      .then(
        data => dispatch({
          type: POST_NEWS_FORM_SUCCESS,
          payload: data
        }),
        err => dispatch({
          type: POST_NEWS_FORM_ERROR,
          payload: err
        })
      )
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
  [FETCH_NEWS_POSTS_ERROR] : (state, action) => state = action.payload,
  [POST_NEWS_FORM_SUCCESS] : (state, action) => state = action.payload,
  [POST_NEWS_FORM_ERROR] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function newsPostsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
