import { createSelector } from 'reselect'

/*
state.journalism
*/

export const selectJournalismHasFetched = (state) => state.journalism.hasFetched;

export const selectJournalismEditSuccess = (state) => state.journalism.editSuccess;

export const selectJournalismArticles = (state) => state.journalism.articles;

export const selectJournalismArticlesReverse = createSelector(
  selectJournalismArticles,
  (articles) => articles && articles.reverse()
);

export const filterJournalismArticlesArticle = (state, id) => state.journalism.articles.filter((p) => p._id === id);

export const selectJournalismArticlesArticle = createSelector(
  filterJournalismArticlesArticle,
  (articlesArr) => articlesArr && articlesArr[0]
);

/*
state.journalism.selectedJournalismArticle
*/

export const selectSelectedJournalismArticle = (state) => state.selectedJournalismArticle;

export const selectSelectedJournalismArticleTitle = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.title
);

export const selectSelectedJournalismArticleCopy = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.copy
);

export const selectSelectedJournalismArticleExternalLink = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.externalLink
);

export const selectSelectedJournalismArticleCategoryId = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.categoryId
);

export const selectSelectedJournalismArticleImage = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.image
);

export const selectSelectedJournalismArticleReleaseDate = createSelector(
  selectSelectedJournalismArticle,
  (article) => article && article.releaseDate
);
