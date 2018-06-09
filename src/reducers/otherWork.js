import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  OTHER_WORK,
  OTHER_WORK_CREATE
} from '../constants';
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import { setSelectedOtherWorkArticle } from './otherWorkArticle';
export const FETCH_OTHER_WORK_ARTICLES_SUCCESS = 'FETCH_OTHER_WORK_ARTICLES_SUCCESS';
export const POST_OTHER_WORK_FORM_SUCCESS = 'POST_OTHER_WORK_FORM_SUCCESS';
export const EDIT_OTHER_WORK_SUCCESS = 'EDIT_OTHER_WORK_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchOtherWorkArticlesSuccess(data) {
  return {
    type: FETCH_OTHER_WORK_ARTICLES_SUCCESS,
    payload: data
  }
}

export function postOtherWorkSuccess(data) {
  return {
    type: POST_OTHER_WORK_FORM_SUCCESS,
    payload: data
  }
}

export function editOtherWorkSuccess() {
  return { type: EDIT_OTHER_WORK_SUCCESS }
}

export const fetchOtherWorkArticles = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + OTHER_WORK)
      .then(
        (res) => {
          dispatch(fetchOtherWorkArticlesSuccess(res.data));
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err.response && err.response.status.toString()));
        }
      )
  }
}

export const postOtherWork = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const getFormObj = () => {
      if (getState().form.OTHER_WORK_ARTICLE_FORM &&
        getState().form.OTHER_WORK_ARTICLE_FORM.values) {
        return JSON.stringify(getState().form.OTHER_WORK_ARTICLE_FORM.values);
      } else {
        return null;
      }
    }
    return _axiosAuthHeaders.post(
      API_ROOT + OTHER_WORK_CREATE,
      getFormObj()
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(postOtherWorkSuccess(data));
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err.response && err.response.status.toString()));
        return err;
      }
    );
  }
}

export const editOtherWork = (postToEdit) => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    let getFormValues = () => {
      if (getState().form.OTHER_WORK_ARTICLE_FORM &&
        getState().form.OTHER_WORK_ARTICLE_FORM.values) {
        return getState().form.OTHER_WORK_ARTICLE_FORM.values;
      } else {
        return null;
      }
    }
    const reduxFormObj = getFormValues();
    postToEdit.title = reduxFormObj.title;
    postToEdit.copy = reduxFormObj.copy;
    postToEdit.mainImageUrl = reduxFormObj.mainImageUrl;

    return _axiosAuthHeaders.put(
      API_ROOT + OTHER_WORK + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        postToEdit.editSuccess = true;
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(setSelectedOtherWorkArticle(postToEdit));
        dispatch(editOtherWorkSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError(err.response && err.response.status.toString()));
      }
    );
  }
}

export const actions = {
  fetchOtherWorkArticles,
  postOtherWork,
  editOtherWork
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [FETCH_OTHER_WORK_ARTICLES_SUCCESS]: (state, action) => {
    return { ...state, articles: action.payload }
  },
  [POST_OTHER_WORK_FORM_SUCCESS]: (state, action) => state = action.payload
}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  articles: null
};
export default function newsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
