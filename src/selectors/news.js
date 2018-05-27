import { createSelector } from 'reselect'

/*
state.news.articlesQueue
*/

// export const selectNewsArticlesQueue = (state) => state.news.articlesQueue;

// export const selectNewsArticlesQueueReverse = createSelector(
//   selectNewsArticlesQueue,
//   (articlesQueue) => articlesQueue && articlesQueue.reverse()
// );

/*
state.news.articles
*/

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

export const selectSelectedNewsArticleBodyMain = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.bodyMain
);

export const selectSelectedNewsArticleQuotes = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.quotes
);

export const selectSelectedNewsArticleMainImage = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.mainImage && article.mainImage
);

export const selectSelectedNewsArticleMainImageUrl = createSelector(
  selectSelectedNewsArticleMainImage,
  (mainImage) => mainImage && mainImage.url
);

export const selectSelectedNewsArticleMainImageExternalLink = createSelector(
  selectSelectedNewsArticleMainImage,
  (mainImage) => mainImage && mainImage.externalLink
);

export const selectSelectedNewsArticleSecondaryImageUrl = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.secondaryImageUrl
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

export const selectSelectedNewsArticleSocialShare = createSelector(
  selectSelectedNewsArticle,
  (article) => article && article.socialShare
);

export const selectSelectedNewsArticleSocialShareHashtags = createSelector(
  selectSelectedNewsArticleSocialShare,
  (socialShare) => socialShare && socialShare.hashtags
);

