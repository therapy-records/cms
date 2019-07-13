import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  JOURNALISM
} from '../constants'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import { fetchJournalismArticles } from './journalism';

export const INITIAL_STATE = {};

export const SET_SELECTED_JOURNALISM_ARTICLE = 'SET_SELECTED_JOURNALISM_ARTICLE';
export const SET_SELECTED_JOURNALISM_ARTICLE_DELETED = 'SET_SELECTED_JOURNALISM_ARTICLE_DELETED';
export const DESTROY_SELECTED_JOURNALISM_ARTICLE = 'DESTROY_SELECTED_JOURNALISM_ARTICLE';

export const DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS = 'DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS';
export const DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR = 'DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

export function selectedJournalismArticle(article) {
  return {
    type: SET_SELECTED_JOURNALISM_ARTICLE,
    payload: article
  }
}

export function selectedJournalismArticleDeleted() {
  return {
    type: SET_SELECTED_JOURNALISM_ARTICLE_DELETED,
    payload: { isDeleted: true }
  }
}

export function deleteSuccess(data) {
  return {
    type: DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS,
    payload: data
  }
}

export function deleteError() {
  return {
    type: DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR,
    payload: { error: true }
  }
}

export const setSelectedJournalismArticle = (article) => {
  return (dispatch) => {
    dispatch(selectedJournalismArticle(article));
  }
}

export const fetchSingleJournalismArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + JOURNALISM + '/' + articleId)
      .then(
        (res) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
          dispatch(selectedJournalismArticle(res.data));
        },
        () => {
          dispatch(promiseLoading(false));
          dispatch(promiseError());
        }
      )
  }
}

export const deleteJournalismArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + JOURNALISM + '/' + articleId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteSuccess(data));
            dispatch(selectedJournalismArticleDeleted());
            dispatch(fetchJournalismArticles());
            resolve()
          } else {
            dispatch(promiseLoading(false));
            dispatch(promiseError());
            dispatch(deleteError())
            reject(new Error('Unable to delete journalism article'));
          }
        }
        );
    })
  }
}

export const destroySelectedJournalismArticle = () => {
  return (dispatch) => {
    dispatch({
      type: DESTROY_SELECTED_JOURNALISM_ARTICLE,
      payload: {}
    })
  }
}

export const actions = {
  fetchSingleJournalismArticle,
  deleteJournalismArticle,
  setSelectedJournalismArticle,
  selectedJournalismArticleDeleted,
  destroySelectedJournalismArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [SET_SELECTED_JOURNALISM_ARTICLE]: (state, action) => state = action.payload,
  [SET_SELECTED_JOURNALISM_ARTICLE_DELETED]: (state, action) => state = action.payload,
  [DESTROY_SELECTED_JOURNALISM_ARTICLE]: (state, action) => state = action.payload,

  [DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS]: (state, action) => state = action.payload,
  [DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR]: (state, action) => state = action.payload

}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------

export default function selectedJournalismArticleReducer(state = INITIAL_STATE, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
