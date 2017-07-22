import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE,
  NEWS_QUEUE
} from '../constants';
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';

export const FETCH_NEWS_POSTS_SUCCESS = 'FETCH_NEWS_POSTS_SUCCESS';
export const FETCH_NEWS_POSTS_QUEUE_SUCCESS = 'FETCH_NEWS_POSTS_QUEUE_SUCCESS';
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';
export const POST_NEWS_FORM_QUEUE_SUCCESS = 'POST_NEWS_FORM_QUEUE_SUCCESS';
export const EDIT_NEWS_SUCCESS = 'EDIT_NEWS_SUCCESS';
export const EDIT_NEWS_QUEUE_SUCCESS = 'EDIT_NEWS_QUEUE_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchPostsSuccess(data) {
  return {
    type: FETCH_NEWS_POSTS_SUCCESS,
    payload: data
  }
}

export function fetchQueueSuccess(data) {
  return {
    type: FETCH_NEWS_POSTS_QUEUE_SUCCESS,
    payload: data
  }
}

export function postNewsSuccess(data) {
  return {
    type: POST_NEWS_FORM_SUCCESS,
    payload: data
  }
}

export function postNewsQueueSuccess() {
  return {
    type: POST_NEWS_FORM_QUEUE_SUCCESS,
    payload: []
  }
}

export function editNewsSuccess() {
  return { type: EDIT_NEWS_SUCCESS }
}

export function editNewsQueueSuccess() {
  return { type: EDIT_NEWS_QUEUE_SUCCESS }
}

export const fetchNewsPosts = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + NEWS)
      .then(
        (res) => {
          dispatch(fetchPostsSuccess(res.data));
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err));
        }
      )
  }
}

export const fetchNewsQueuePosts = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return _axiosAuthHeaders.get(API_ROOT + NEWS_QUEUE)
      .then(
        (res) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
          dispatch(fetchQueueSuccess(res.data));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err));
        }
      )
  }
}

export const postNews = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const getFormObj = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return JSON.stringify(getState().form.NEWS_POST_FORM.values);
      } else {
        return null;
      }
    }
    return _axiosAuthHeaders.post(
      API_ROOT + NEWS_CREATE,
      getFormObj()
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(postNewsSuccess(data));
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err));
      }
    );
  }
}

export const postNewsQueue = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const getFormObj = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return JSON.stringify(getState().form.NEWS_POST_FORM.values);
      } else {
        return null;
      }
    }
    return _axiosAuthHeaders.post(
      API_ROOT + NEWS_QUEUE,
      getFormObj()
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(postNewsQueueSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err));
      }
    );
  }
}

export const editNews = (postToEdit) => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    let getFormValues = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return getState().form.NEWS_POST_FORM.values;
      } else {
        return null;
      }
    }
    const reduxFormObj = getFormValues();
    postToEdit.title = reduxFormObj.title;
    postToEdit.bodyMain = reduxFormObj.bodyMain;
    postToEdit.scheduledTime = reduxFormObj.scheduledTime;

    return _axiosAuthHeaders.put(
      API_ROOT + NEWS + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(editNewsSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err));
      }
    );
  }
}

export const editNewsQueue = (postToEdit) => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    let getFormValues = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return getState().form.NEWS_POST_FORM.values;
      } else {
        return null;
      }
    }
    const reduxFormObj = getFormValues();
    postToEdit.title = reduxFormObj.title;
    postToEdit.bodyMain = reduxFormObj.bodyMain;
    postToEdit.scheduledTime = reduxFormObj.scheduledTime;

    return _axiosAuthHeaders.put(
      API_ROOT + NEWS_QUEUE + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(editNewsQueueSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err));
      }
    );
  }
}

export const actions = {
  fetchNewsPosts,
  fetchNewsQueuePosts,
  postNews,
  postNewsQueue,
  editNews,
  editNewsQueue
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [FETCH_NEWS_POSTS_SUCCESS] : (state, action) => {
    return { ...state, posts: action.payload }
  },
  [FETCH_NEWS_POSTS_QUEUE_SUCCESS] : (state, action) => {
    return { ...state, postsQueue: action.payload }
  },
  [POST_NEWS_FORM_SUCCESS] : (state, action) => state = action.payload,
  [POST_NEWS_FORM_QUEUE_SUCCESS] : (state, action) => state = action.payload
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  posts: [],
  postsQueue: []
};
export default function newsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

