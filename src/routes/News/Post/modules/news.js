import {
  API_ROOT,
  NEWS
} from '../../../../constants'
export const FETCH_NEWS_POST_SINGLE = 'FETCH_NEWS_POST_SINGLE'
export const FETCH_NEWS_POST_SINGLE_SUCCESS = 'FETCH_NEWS_POST_SINGLE_SUCCESS'
export const FETCH_NEWS_POST_SINGLE_ERROR = 'FETCH_NEWS_POST_SINGLE_ERROR'

// ------------------------------------
// Actions
// ------------------------------------

function success(data){
  return {
    type: FETCH_NEWS_POST_SINGLE_SUCCESS,
    payload: data
  }
}


//todo: why doesn't error work?
function error(){
  return {
    type: FETCH_NEWS_POST_SINGLE_ERROR,
    payload: {error: true}
  }
}

export const fetchNewsPost = (postId) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS + '/' + postId)
        .then(res => res.json())
        .then((data) => {
          if (data) {
            dispatch(success(data));
            resolve()
          } else if (err) {
            dispatch(error())
            resolve()
          }
        }
      );
    })

  }
}

export const actions = {
  fetchNewsPost
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_NEWS_POST_SINGLE_SUCCESS] : (state, action) => state = action.payload,
  [FETCH_NEWS_POST_SINGLE_ERROR] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function blaReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
