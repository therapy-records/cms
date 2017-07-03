import axios from 'axios';
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../constants';
import {
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState
} from './uiState';

export const FETCH_NEWS_POSTS_SUCCESS = 'FETCH_NEWS_POSTS_SUCCESS';
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';

export const _axios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
});

// ------------------------------------
// Actions
// ------------------------------------

export function fetchSuccess(data){
  return {
    type: FETCH_NEWS_POSTS_SUCCESS,
    payload: data
  }
}

export const fetchNews = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + NEWS)
      .then(
        (res) => {
          dispatch(fetchSuccess(res.data));
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
    return _axios.post(
      API_ROOT + NEWS_CREATE,
      getFormObj()
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err));
      }
    );

  }
}

export const editNews = (editedPost) => {
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
    editedPost.title = reduxFormObj.title;
    editedPost.bodyMain = reduxFormObj.bodyMain;

    return _axios.put(
      API_ROOT + NEWS + '/' + editedPost._id,
      JSON.stringify(editedPost)
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true)); 
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err)); 
      }
    );
  }
}

export const actions = {
  fetchNews,
  postNews,
  editNews
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_NEWS_POSTS_SUCCESS] : (state, action) => {
    return {...state, posts: action.payload}
  },
  [POST_NEWS_FORM_SUCCESS] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  posts: []
};
export default function newsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
