import { createSelector } from 'reselect'

/*
state.otherWork.articles
*/

export const selectOtherWorkArticles = (state) => state.otherWork.articles;

export const selectOtherWorkArticlesReverse = createSelector(
  selectOtherWorkArticles,
  (articles) => articles && articles.reverse()
);

export const filterOtherWorkArticlesArticle = (state, id) => state.otherWork.articles.filter((p) => p._id === id);

export const selectOtherWorkArticlesArticle = createSelector(
  filterOtherWorkArticlesArticle,
  (articlesArr) => articlesArr && articlesArr[0]
);

/*
state.otherWork.selectedOtherWorkArticle
*/

export const selectSelectedOtherWorkArticle = (state) => state.selectedOtherWorkArticle;

export const selectSelectedOtherWorkArticleTitle = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.title
);

export const selectSelectedOtherWorkArticleBodyMain = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.bodyMain
);
