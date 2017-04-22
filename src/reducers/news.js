import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../constants'


import {
  promiseLoading,
  promiseSuccess,
  promiseError,
  resetPromiseState
} from './uiState';

export const FETCH_NEWS_POSTS_SUCCESS = 'FETCH_NEWS_POSTS_SUCCESS'
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

function fetchSuccess(data){
  return {
    type: FETCH_NEWS_POSTS_SUCCESS,
    payload: data
  }
}

export const fetchNews = () => {
  return (dispatch, getState) => {
    dispatch(promiseLoading(true));
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS)
      .then(res => res.json())
      .then(
        (data) => {
          dispatch(fetchSuccess(data));
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        },
        (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err));
        }
      );
    })
  }
}

export const postNews = () => {
  return (dispatch, getState) => {
    const formObj = () => {
      if (getState().form.NEWS_POST_FORM &&
          getState().form.NEWS_POST_FORM.values) {
        return JSON.stringify(getState().form.NEWS_POST_FORM.values);
      } else {
        return null;
      }
    }
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'))
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS_CREATE, {
          method: 'POST',
          headers: postHeaders,
          body: formObj()
        }
      )
      .then(
        (data) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true));
        }, (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err));
        }
      )
    })
  }
}

export const editNews = (editedPost) => {
  return (dispatch, getState) => {
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
    const postHeaders = new Headers();
    postHeaders.set('Content-Type', 'application/json');
    postHeaders.set('Authorization', localStorage.getItem('token'))
    return new Promise((resolve) => {
      fetch(API_ROOT + NEWS + '/' + editedPost._id, {
          method: 'PUT',
          headers: postHeaders,
          body: JSON.stringify(editedPost)
        }
      )
      .then(
        (data) => {
          dispatch(promiseLoading(false));
          dispatch(promiseSuccess(true)); 
        }, (err) => {
          dispatch(promiseLoading(false));
          dispatch(promiseError(err)); 
        }
      )
    })
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
