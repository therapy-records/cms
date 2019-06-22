import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  OTHER_WORK
} from '../constants'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import { fetchOtherWorkArticles } from './otherWork';

export const SET_SELECTED_OTHER_WORK_ARTICLE = 'SET_SELECTED_OTHER_WORK_ARTICLE';
export const SET_SELECTED_OTHER_WORK_ARTICLE_DELETED = 'SET_SELECTED_OTHER_WORK_ARTICLE_DELETED';
export const DESTROY_SELECTED_OTHER_WORK_ARTICLE = 'DESTROY_SELECTED_OTHER_WORK_ARTICLE';

export const DELETE_SINGLE_OTHER_WORK_ARTICLE_SUCCESS = 'DELETE_SINGLE_OTHER_WORK_ARTICLE_SUCCESS';
export const DELETE_SINGLE_OTHER_WORK_ARTICLE_ERROR = 'DELETE_SINGLE_OTHER_WORK_ARTICLE_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function selectedOtherWorkArticle(article) {
  return {
    type: SET_SELECTED_OTHER_WORK_ARTICLE,
    payload: article
  }
}

function selectedOtherWorkArticleDeleted() {
  return {
    type: SET_SELECTED_OTHER_WORK_ARTICLE_DELETED,
    payload: { isDeleted: true }
  }
}

function deleteSuccess(data) {
  return {
    type: DELETE_SINGLE_OTHER_WORK_ARTICLE_SUCCESS,
    payload: data
  }
}

function deleteError() {
  return {
    type: DELETE_SINGLE_OTHER_WORK_ARTICLE_ERROR,
    payload: { error: true }
  }
}

export const setSelectedOtherWorkArticle = (article) => {
  return (dispatch) => {
    dispatch(selectedOtherWorkArticle(article));
  }
}

export const fetchSingleOtherWorkArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + OTHER_WORK + '/' + articleId)
      .then(
        (res) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
          dispatch(selectedOtherWorkArticle(res.data));
        },
        () => {
          dispatch(promiseLoading(false));
          dispatch(promiseError());
        }
      )
  }
}

export const deleteOtherWorkArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    const postHeaders = new Headers(); // eslint-disable-line no-undef
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token')); // eslint-disable-line no-undef
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + OTHER_WORK + '/' + articleId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteSuccess(data));
            dispatch(selectedOtherWorkArticleDeleted());
            dispatch(fetchOtherWorkArticles());
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

export const destroySelectedOtherWorkArticle = () => {
  return (dispatch) => {
    dispatch({
      type: DESTROY_SELECTED_OTHER_WORK_ARTICLE,
      payload: {}
    })
  }
}

export const actions = {
  fetchSingleOtherWorkArticle,
  deleteOtherWorkArticle,
  setSelectedOtherWorkArticle,
  selectedOtherWorkArticleDeleted,
  destroySelectedOtherWorkArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [SET_SELECTED_OTHER_WORK_ARTICLE]: (state, action) => state = action.payload,
  [SET_SELECTED_OTHER_WORK_ARTICLE_DELETED]: (state, action) => state = action.payload,
  [DESTROY_SELECTED_OTHER_WORK_ARTICLE]: (state, action) => state = action.payload,

  [DELETE_SINGLE_OTHER_WORK_ARTICLE_SUCCESS]: (state, action) => state = action.payload,
  [DELETE_SINGLE_OTHER_WORK_ARTICLE_ERROR]: (state, action) => state = action.payload

}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};

export default function selectedOtherWorkArticleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
