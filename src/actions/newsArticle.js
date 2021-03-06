import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import { EMPTY_ARTICLE_SECTION_OBJ } from '../utils/news';
import {
  API_ROOT,
  NEWS
} from '../constants'
import {
  SET_SELECTED_NEWS_ARTICLE,
  SET_SELECTED_NEWS_ARTICLE_DELETED,
  DESTROY_SELECTED_NEWS_ARTICLE,
  DELETE_SINGLE_NEWS_ARTICLE_SUCCESS,
  DELETE_SINGLE_NEWS_ARTICLE_ERROR
} from '../constants/actions'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from '../actions/uiState';
import { fetchNewsArticles } from './news';

export const INITIAL_STATE = {
  sections: [
    EMPTY_ARTICLE_SECTION_OBJ
  ]
};

export function selectedNewsArticle(article) {
  return {
    type: SET_SELECTED_NEWS_ARTICLE,
    payload: article
  }
}

export function selectedNewsArticleDeleted() {
  return {
    type: SET_SELECTED_NEWS_ARTICLE_DELETED,
    payload: { isDeleted: true }
  }
}

export function deleteSuccess(data) {
  return {
    type: DELETE_SINGLE_NEWS_ARTICLE_SUCCESS,
    payload: data
  }
}

export function deleteError() {
  return {
    type: DELETE_SINGLE_NEWS_ARTICLE_ERROR,
    payload: { error: true }
  }
}

export const setSelectedNewsArticle = (article) => {
  return (dispatch) => {
    dispatch(selectedNewsArticle(article));
  }
}

export const setSelectedNewsArticleEditSuccess = (article) => {
  return (dispatch) => {
    dispatch(selectedNewsArticle(article));
  }
}

export const fetchSingleNewsArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + NEWS + '/' + articleId)
      .then(
        (res) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
          dispatch(selectedNewsArticle(res.data));
        },
        (apiError) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError())
        }
      )
  }
}

export const deleteNewsArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + NEWS + '/' + articleId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteSuccess(data));
            dispatch(selectedNewsArticleDeleted());
            dispatch(fetchNewsArticles());
            resolve();
          } else {
            dispatch(promiseLoading(false));
            dispatch(promiseError());
            dispatch(deleteError());
            reject(new Error('Unable to delete news article'));
          }
        }
        );
    })
  }
}

export const destroySelectedNewsArticle = () => {
  return (dispatch) => {
    dispatch({
      type: DESTROY_SELECTED_NEWS_ARTICLE,
      payload: {}
    })
  }
}

export const actions = {
  fetchSingleNewsArticle,
  deleteNewsArticle,
  setSelectedNewsArticle,
  setSelectedNewsArticleEditSuccess,
  selectedNewsArticleDeleted,
  destroySelectedNewsArticle
}
