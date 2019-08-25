const envProd = process.NODE_ENV === 'production';
export const API_ROOT_DEV = 'http://localhost:4040/api/';
export const API_ROOT_PROD = 'https://fr-cms-api.herokuapp.com/api/';


export const /* istanbul ignore next */ API_ROOT = envProd ? API_ROOT_PROD : API_ROOT_DEV;

export const NEWS = 'news';
export const NEWS_CREATE = NEWS;

export const JOURNALISM = 'journalism';
export const JOURNALISM_CREATE = JOURNALISM;

export const AUTH = 'auth';
export const AUTH_LOGIN = AUTH + '/login';

export const NEWS_FORM = 'NEWS_FORM';
export const JOURNALISM_FORM = 'JOURNALISM_FORM';
