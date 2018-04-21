const envProd = process.env === 'production';
export const API_ROOT_DEV = 'http://localhost:4040/api/';
export const API_ROOT_PROD = 'https://fr-cms-api.herokuapp.com/api/';

export const API_ROOT = envProd ? API_ROOT_PROD : API_ROOT_DEV;

export const NEWS = 'news';
export const NEWS_CREATE = 'news/create';
export const NEWS_QUEUE = 'news/queue';

export const OTHER_WORK = 'other-work';
export const OTHER_WORK_CREATE = OTHER_WORK;

export const AUTH = 'auth';
export const AUTH_LOGIN = AUTH + '/login';

export const NEWS_ARTICLE_FORM = 'NEWS_ARTICLE_FORM';
export const OTHER_WORK_ARTICLE_FORM = 'OTHER_WORK_ARTICLE_FORM';
