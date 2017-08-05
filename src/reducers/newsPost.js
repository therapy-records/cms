import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  NEWS,
  NEWS_QUEUE
} from '../constants'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';

export const FETCH_SELECTED_NEWS_POST_SUCCESS = 'FETCH_SELECTED_NEWS_POST_SUCCESS'
export const FETCH_SELECTED_NEWS_POST_ERROR = 'FETCH_SELECTED_NEWS_POST_ERROR'

export const SET_SELECTED_NEWS_POST = 'SET_SELECTED_NEWS_POST';
export const SET_SELECTED_NEWS_POST_DELETED = 'SET_SELECTED_NEWS_POST_DELETED';
export const DESTROY_SELECTED_NEWS_POST = 'DESTROY_SELECTED_NEWS_POST';

export const DELETE_SINGLE_NEWS_POST_SUCCESS = 'DELETE_SINGLE_NEWS_POST_SUCCESS';
export const DELETE_SINGLE_NEWS_POST_ERROR = 'DELETE_SINGLE_NEWS_POST_ERROR';

export const DELETE_SINGLE_NEWS_QUEUE_POST_SUCCESS = 'DELETE_SINGLE_NEWS_QUEUE_POST_SUCCESS';
export const DELETE_SINGLE_NEWS_QUEUE_POST_ERROR = 'DELETE_SINGLE_NEWS_QUEUE_POST_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function success(data) {
  return {
    type: FETCH_SELECTED_NEWS_POST_SUCCESS,
    payload: data
  }
}

function selectedNewsPost(post) {
  return {
    type: SET_SELECTED_NEWS_POST,
    payload: post
  }
}

function selectedNewsPostDeleted() {
  return {
    type: SET_SELECTED_NEWS_POST_DELETED,
    payload: { isDeleted: true }
  }
}

function deleteSuccess(data) {
  return {
    type: DELETE_SINGLE_NEWS_POST_SUCCESS,
    payload: data
  }
}

function deleteQueuePostSuccess() {
  return {
    type: DELETE_SINGLE_NEWS_QUEUE_POST_SUCCESS,
    payload: {}
  }
}

function deleteQueuePostError(data) {
  return {
    type: DELETE_SINGLE_NEWS_QUEUE_POST_ERROR,
    payload: { error: true }
  }
}

function deleteError() {
  return {
    type: DELETE_SINGLE_NEWS_POST_ERROR,
    payload: { error: true }
  }
}

export const setSelectedNewsPost = (post) => {
  return (dispatch) => {
    dispatch(selectedNewsPost(post));
  }
}

export const fetchNewsPost = (postId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(API_ROOT + NEWS + '/' + postId)
        .then(res => res.json())
        .then((data) => {
          if (data) {
            dispatch(success(data));
            resolve()
          } else {
            dispatch(deleteError())
            reject()
          }
        }
      );
    })
  }
}

export const deleteNewsPost = (postId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + NEWS + '/' + postId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteSuccess(data));
            dispatch(selectedNewsPostDeleted());
            resolve()
          } else {
            dispatch(promiseLoading(false));
            dispatch(promiseError());
            dispatch(deleteError())
            reject()
          }
        }
      );
    })
  }
}

export const deleteScheduledArticle = (postId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + NEWS_QUEUE + '/' + postId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteQueuePostSuccess());
            dispatch(selectedNewsPostDeleted());
            resolve();
          } else {
            dispatch(promiseLoading(false));
            dispatch(promiseError());
            dispatch(deleteQueuePostError())
            reject();
          }
        });
    })
  }
}

export const destroySelectedNewsPost = () => {
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
  setSelectedNewsPost,
  selectedNewsPostDeleted,
  destroySelectedNewsPost,
  deleteScheduledArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [FETCH_SELECTED_NEWS_POST_SUCCESS] : (state, action) => state = action.payload,
  [FETCH_SELECTED_NEWS_POST_ERROR] : (state, action) => state = action.payload,

  [SET_SELECTED_NEWS_POST] : (state, action) => state = action.payload,
  [SET_SELECTED_NEWS_POST_DELETED] : (state, action) => state = action.payload,
  [DESTROY_SELECTED_NEWS_POST] : (state, action) => state = action.payload,

  [DELETE_SINGLE_NEWS_POST_SUCCESS] : (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_POST_ERROR] :  (state, action) => state = action.payload,

  [DELETE_SINGLE_NEWS_QUEUE_POST_SUCCESS] : (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_QUEUE_POST_ERROR] : (state, action) => state = action.payload

}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};

export default function selectedNewsPostReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
