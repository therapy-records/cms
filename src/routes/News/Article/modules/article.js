import {
  API_ROOT,
  NEWS
} from '../../../../constants'
export const FETCH_SELECTED_NEWS_POST_SUCCESS = 'FETCH_SELECTED_NEWS_POST_SUCCESS'
export const FETCH_SELECTED_NEWS_POST_ERROR = 'FETCH_SELECTED_NEWS_POST_ERROR'
export const DESTROY_SELECTED_NEWS_POST = 'DESTROY_SELECTED_NEWS_POST';
export const DELETE_SINGLE_NEWS_POST_SUCCESS = 'DELETE_SINGLE_NEWS_POST_SUCCESS';
export const DELETE_SINGLE_NEWS_POST_ERROR = 'DELETE_SINGLE_NEWS_POST_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function success(data){
  return {
    type: FETCH_SELECTED_NEWS_POST_SUCCESS,
    payload: data
  }
}


//todo: why doesn't error work?
function error() {
  return {
    type: FETCH_SELECTED_NEWS_POST_ERROR,
    payload: {error: true}
  }
}

function deleteSuccess(data){
  return {
    type: DELETE_SINGLE_NEWS_POST_SUCCESS,
    payload: data
  }
}


//todo: why doesn't error work?
function deleteError() {
  return {
    type: DELETE_SINGLE_NEWS_POST_ERROR,
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

export const deleteNewsPost = (postId) => {
  return (dispatch) => {
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'));
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS + '/' + postId, {
        method: 'DELETE',
        header: postHeaders
      })
        .then(res => res.json())
        .then((data) => {
          if (data) {
            dispatch(deleteSuccess(data));
            resolve()
          } else if (err) {
            dispatch(deleteError())
            resolve()
          }
        }
      );
    })
  }
}

export const destroyNewsPost = () => {
  return (dispatch) => {
    dispatch({
      type: DESTROY_SELECTED_NEWS_POST,
      payload: {}
    })
  }
}

export const actions = {
  fetchNewsPost,
  deleteNewsPost,
  destroyNewsPost
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SELECTED_NEWS_POST_SUCCESS] : (state, action) => state = action.payload,
  [FETCH_SELECTED_NEWS_POST_ERROR] : (state, action) => state = action.payload,
  [DESTROY_SELECTED_NEWS_POST] : (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_POST_SUCCESS] : (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_POST_ERROR] :  (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function selectedNewsPostReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
