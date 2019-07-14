import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  JOURNALISM
} from '../constants'
import {
  SET_SELECTED_JOURNALISM_ARTICLE,
  SET_SELECTED_JOURNALISM_ARTICLE_DELETED,
  DESTROY_SELECTED_JOURNALISM_ARTICLE,
  DELETE_SINGLE_JOURNALISM_ARTICLE_SUCCESS,
  DELETE_SINGLE_JOURNALISM_ARTICLE_ERROR
} from '../constants/actions';

import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import { fetchJournalismArticles } from './journalism';

export const INITIAL_STATE = {};

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
