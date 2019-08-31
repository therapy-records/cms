import axios from 'axios';
import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../constants';
import {
  FETCH_NEWS_ARTICLES_SUCCESS,
  POST_NEWS_FORM_SUCCESS,
  EDIT_NEWS_SUCCESS
} from '../constants/actions';
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from '../actions/uiState';

import { setSelectedNewsArticleEditSuccess } from '../actions/newsArticle';
import { removeEmptyImageUrls } from '../utils/news';

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

export function editNewsSuccess(bool) {
  return { type: EDIT_NEWS_SUCCESS, payload: bool }
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
      const newsFormFromState = getState().form.NEWS_FORM;
      if (newsFormFromState &&
        newsFormFromState.values) {
        return newsFormFromState.values;
      }
    }

    const formObj = getFormObj();
    formObj.sections = removeEmptyImageUrls(formObj.sections);

    const token = localStorage.getItem('token');
    const _axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return _axios.post(
      API_ROOT + NEWS_CREATE,
      JSON.stringify(formObj)
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
    let getFormObj = () => {
      const newsFormFromState = getState().form.NEWS_FORM;
      if (newsFormFromState &&
        newsFormFromState.values) {
        return newsFormFromState.values;
      }
    }

    const formObj = getFormObj();
    postToEdit.title = formObj.title;
    postToEdit.sections = removeEmptyImageUrls(formObj.sections);

    const token = localStorage.getItem('token');
    const _axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return _axios.put(
      API_ROOT + NEWS + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(setSelectedNewsArticleEditSuccess(postToEdit))
        dispatch(editNewsSuccess(true));
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
