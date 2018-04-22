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

export const selectSelectedOtherWorkArticleCopy = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.copy
);

export const selectSelectedOtherWorkArticleMainImageExternalLink = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.externalLink
);

export const selectSelectedOtherWorkArticleMainImageUrl = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.mainImageUrl
);

export const selectSelectedOtherWorkArticleReleaseDate = createSelector(
  selectSelectedOtherWorkArticle,
  (article) => article && article.releaseDate
);
