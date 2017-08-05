import { createSelector } from 'reselect'

/*
state.news.articlesQueue
*/

export const selectNewsArticlesQueue = (state) => state.news.articlesQueue;

export const selectNewsArticlesQueueReverse = createSelector(
  selectNewsArticlesQueue,
  (articlesQueue) => articlesQueue.reverse()
);

/*
state.news.articles
*/

export const selectNewsArticles = (state) => state.news.articles;

export const selectNewsArticlesReverse = createSelector(
  selectNewsArticles,
  (articles) => articles.reverse()
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

export const selectSelectedNewsArticleBodyMain = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.bodyMain
);

export const selectSelectedNewsArticleMainImageUrl = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.mainImageUrl
);

export const selectSelectedNewsArticleTicketsLink = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.ticketsLink
);

export const selectSelectedNewsArticleVenueLink = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.venueLink
);

export const selectSelectedNewsArticleMiniGalleryImages = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.miniGalleryImages
);

export const selectSelectedNewsArticleVideoEmbed = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.videoEmbed
);

export const selectSelectedNewsArticleScheduledTime = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.scheduledTime
);
