import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../constants';
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';

import { setSelectedNewsArticleEditSuccess } from './newsArticle';

export const FETCH_NEWS_ARTICLES_SUCCESS = 'FETCH_NEWS_ARTICLES_SUCCESS';
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';
export const EDIT_NEWS_SUCCESS = 'EDIT_NEWS_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchArticlesSuccess(data) {
  return {
    type: FETCH_NEWS_ARTICLES_SUCCESS,
    payload: data
  }
}
export function postNewsSuccess(data) {
  return {
    type: POST_NEWS_FORM_SUCCESS,
    payload: data
  }
}

export function editNewsSuccess() {
  return { type: EDIT_NEWS_SUCCESS }
}

export const fetchNewsArticles = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + NEWS)
      .then(
        (res) => {
          dispatch(fetchArticlesSuccess(res.data));
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError());
        }
      )
  }
}

export const postNews = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const getFormObj = () => {
      if (getState().form.NEWS_ARTICLE_FORM &&
          getState().form.NEWS_ARTICLE_FORM.values) {
        return JSON.stringify(getState().form.NEWS_ARTICLE_FORM.values);
      } else {
        return null;
      }
    }
    return _axiosAuthHeaders.post(
      API_ROOT + NEWS_CREATE,
      getFormObj()
    ).then(
      (res) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(postNewsSuccess(res.data));
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError());
        return err;
      }
    );
  }
}

export const editNews = (postToEdit) => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    let getFormValues = () => {
      if (getState().form.NEWS_ARTICLE_FORM &&
        getState().form.NEWS_ARTICLE_FORM.values) {
        return getState().form.NEWS_ARTICLE_FORM.values;
      } else {
        return null;
      }
    }
    const reduxFormObj = getFormValues();
    postToEdit.title = reduxFormObj.title;
    postToEdit.bodyMain = reduxFormObj.bodyMain;
    postToEdit.mainImage = reduxFormObj.mainImage;

    return _axiosAuthHeaders.put(
      API_ROOT + NEWS + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        postToEdit.editSuccess = true;
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(setSelectedNewsArticleEditSuccess(postToEdit))
        dispatch(editNewsSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError());
      }
    );
  }
}
export const actions = {
  fetchNewsArticles,
  postNews,
  editNews
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [FETCH_NEWS_ARTICLES_SUCCESS]: (state, action) => {
    return { ...state, articles: action.payload }
  },
  [POST_NEWS_FORM_SUCCESS]: (state, action) => state = {
    ...state,
    articles: [ ...state.articles, action.payload ]
  }
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
