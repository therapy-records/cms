import {
  API_ROOT,
  NEWS,
  NEWS_CREATE
} from '../../../../constants'
export const POST_NEWS_FORM_SUCCESS = 'POST_NEWS_FORM_SUCCESS';
export const EDIT_NEWS_FORM_SUCCESS = 'EDIT_NEWS_FORM_SUCCESS';
export const POST_NEWS_FORM_ERROR = 'POST_NEWS_FORM_ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function success(){
  return {
    type: POST_NEWS_FORM_SUCCESS,
    payload: {success: true}
  }
}

function successEdit() {
  return {
    type: EDIT_NEWS_FORM_SUCCESS,
    payload: {success: true}
  }
}

function error(err){
  return {
    type: POST_NEWS_FORM_ERROR,
    payload: err
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
        data => dispatch(success(data)),
        err => dispatch(error(err))
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
    editedPost.mainBody = reduxFormObj.mainBody;
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
        data => dispatch(successEdit(data)),
        err => dispatch(error(err))
      )
    })
  }
}

export const actions = {
  postNews,
  editNews
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_NEWS_FORM_SUCCESS] : (state, action) => state = action.payload,
  [EDIT_NEWS_FORM_SUCCESS] : (state, action) => state = action.payload,
  [POST_NEWS_FORM_ERROR] : (state, action) => state = action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {success: false};
export default function newsPostsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
