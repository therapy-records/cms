import axios from 'axios';
import _axiosAuthHeaders from '../utils/axios'
import {
  API_ROOT,
  NEWS
  // NEWS_QUEUE
} from '../constants'
import {
  promiseLoading,
  promiseSuccess,
  promiseError
} from './uiState';
import {
  fetchNewsArticles
  // fetchNewsQueueArticles
} from './news';

export const SET_SELECTED_NEWS_ARTICLE = 'SET_SELECTED_NEWS_ARTICLE';
export const SET_SELECTED_NEWS_ARTICLE_DELETED = 'SET_SELECTED_NEWS_ARTICLE_DELETED';
export const DESTROY_SELECTED_NEWS_ARTICLE = 'DESTROY_SELECTED_NEWS_ARTICLE';

export const DELETE_SINGLE_NEWS_ARTICLE_SUCCESS = 'DELETE_SINGLE_NEWS_ARTICLE_SUCCESS';
export const DELETE_SINGLE_NEWS_ARTICLE_ERROR = 'DELETE_SINGLE_NEWS_ARTICLE_ERROR';

// export const DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS = 'DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS';
// export const DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR = 'DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

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

// export function deleteQueueArticleSuccess() {
//   return {
//     type: DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS,
//     payload: {}
//   }
// }

// export function deleteQueueArticleError(data) {
//   return {
//     type: DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR,
//     payload: { error: true }
//   }
// }

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
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err.response && err.response.status.toString()));
        }
      )
  }
}

export const deleteNewsArticle = (articleId) => {
  return (dispatch) => {
    dispatch(promiseLoading(true));
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'));
    return new Promise((resolve, reject) => {
      return _axiosAuthHeaders.delete(API_ROOT + NEWS + '/' + articleId)
        .then((data) => {
          if (data) {
            dispatch(promiseLoading(false));
            dispatch(promiseSuccess(true));
            dispatch(deleteSuccess(data));
            dispatch(selectedNewsArticleDeleted());
            dispatch(fetchNewsArticles());
            // dispatch(fetchNewsQueueArticles());
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

// export const deleteScheduledArticle = (articleId) => {
//   return (dispatch) => {
//     dispatch(promiseLoading(true));
//     const postHeaders = new Headers();
//     postHeaders.set('Content-Type', 'application/json');
//     postHeaders.set('Authorization', localStorage.getItem('token'));
//     return new Promise((resolve, reject) => {
//       return _axiosAuthHeaders.delete(API_ROOT + NEWS_QUEUE + '/' + articleId)
//         .then((data) => {
//           if (data) {
//             dispatch(promiseLoading(false));
//             dispatch(promiseSuccess(true));
//             dispatch(deleteQueueArticleSuccess());
//             dispatch(selectedNewsArticleDeleted());
//             resolve();
//           } else {
//             dispatch(promiseLoading(false));
//             dispatch(promiseError());
//             dispatch(deleteQueueArticleError())
//             reject();
//           }
//         });
//     })
//   }
// }

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
  selectedNewsArticleDeleted,
  destroySelectedNewsArticle
  // deleteScheduledArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
/* eslint-disable no-return-assign */
const ACTION_HANDLERS = {
  [SET_SELECTED_NEWS_ARTICLE] : (state, action) => state = action.payload,
  [SET_SELECTED_NEWS_ARTICLE_DELETED] : (state, action) => state = action.payload,
  [DESTROY_SELECTED_NEWS_ARTICLE] : (state, action) => state = action.payload,

  [DELETE_SINGLE_NEWS_ARTICLE_SUCCESS] : (state, action) => state = action.payload,
  [DELETE_SINGLE_NEWS_ARTICLE_ERROR] :  (state, action) => state = action.payload,

  // [DELETE_SINGLE_NEWS_QUEUE_ARTICLE_SUCCESS] : (state, action) => state = action.payload,
  // [DELETE_SINGLE_NEWS_QUEUE_ARTICLE_ERROR] : (state, action) => state = action.payload

}
/* eslint-enable no-return-assign */

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};

export default function selectedNewsArticleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
