import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  JOURNALISM,
  JOURNALISM_CREATE
} from '../constants';
import {
  FETCH_JOURNALISM_ARTICLES_SUCCESS,
  POST_JOURNALISM_FORM_SUCCESS,
  EDIT_JOURNALISM_SUCCESS
} from '../constants/actions';
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import { setSelectedJournalismArticle } from './journalismArticle';

export function fetchJournalismArticlesSuccess(data) {
  return {
    type: FETCH_JOURNALISM_ARTICLES_SUCCESS,
    payload: data
  }
}

export function postJournalismSuccess(data) {
  return {
    type: POST_JOURNALISM_FORM_SUCCESS,
    payload: data
  }
}

export function editJournalismSuccess() {
  return { type: EDIT_JOURNALISM_SUCCESS }
}

export const fetchJournalismArticles = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return axios.get(API_ROOT + JOURNALISM)
      .then(
        (res) => {
          dispatch(fetchJournalismArticlesSuccess(res.data));
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError())
        }
      )
  }
}

export const postJournalism = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    const getFormObj = () => {
      if (getState().form.JOURNALISM_FORM &&
        getState().form.JOURNALISM_FORM.values) {
        return JSON.stringify(getState().form.JOURNALISM_FORM.values);
      } else {
        return null;
      }
    }

    const token = localStorage.getItem('token');
    const _axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return _axios.post(
      API_ROOT + JOURNALISM_CREATE,
      getFormObj()
    ).then(
      (res) => {
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(postJournalismSuccess(res.data));
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError());
        return err;
      }
    );
  }
}

export const editJournalism = (postToEdit) => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    let getFormValues = () => {
      if (getState().form.JOURNALISM_FORM &&
        getState().form.JOURNALISM_FORM.values) {
        return getState().form.JOURNALISM_FORM.values;
      } else {
        return null;
      }
    }
    const reduxFormObj = getFormValues();
    postToEdit.title = reduxFormObj.title;
    postToEdit.copy = reduxFormObj.copy;
    postToEdit.imageUrl = reduxFormObj.imageUrl;

    return _axiosAuthHeaders.put(
      API_ROOT + JOURNALISM + '/' + postToEdit._id,
      JSON.stringify(postToEdit)
    ).then(
      (data) => {
        postToEdit.editSuccess = true;
        dispatch(promiseLoading(false));
        dispatch(promiseSuccess(true));
        dispatch(setSelectedJournalismArticle(postToEdit));
        dispatch(editJournalismSuccess());
      }, (err) => {
        dispatch(promiseLoading(false));
        dispatch(promiseError());
      }
    );
  }
}

export const actions = {
  fetchJournalismArticles,
  postJournalism,
  editJournalism
}