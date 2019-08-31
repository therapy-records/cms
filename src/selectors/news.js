import { createSelector } from 'reselect'

/*
state.news
*/

export const selectNewsHasFetched = (state) => state.news.hasFetched;

export const selectNewsEditSuccess = (state) => state.news.editSuccess;

export const selectNewsArticles = (state) => state.news.articles;

export const selectNewsArticlesReverse = createSelector(
  selectNewsArticles,
  (articles) => articles && articles.reverse()
);

export const filterNewsArticlesArticle = (state, id) => state.news.articles.filter((p) => p._id === id);

export const selectNewsArticlesArticle = createSelector(
  filterNewsArticlesArticle,
  (articlesArr) => articlesArr && articlesArr[0]
);

/*
state.news.selectedNewsArticle
*/
export const selectSelectedNewsArticle = (state) => state.selectedNewsArticle;

export const selectSelectedNewsArticleTitle = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.title
);

export const selectSelectedNewsArticleSections = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.sections
);
