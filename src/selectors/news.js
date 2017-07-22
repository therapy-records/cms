import { createSelector } from 'reselect'

export const filterNewsPostsPost = (state, id) => state.news.posts.filter((p) => p._id === id);

export const selectNewsPostsPost = createSelector(
  filterNewsPostsPost,
  (postArr) => postArr && postArr[0]
);

export const selectSelectedNewsPost = (state) => state.selectedNewsPost;

export const selectSelectedNewsPostTitle = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.title
);

export const selectSelectedNewsPostBodyMain = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.bodyMain
);

export const selectSelectedNewsPostMainImageUrl = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.mainImageUrl
);

export const selectSelectedNewsPostTicketsLink = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.ticketsLink
);

export const selectSelectedNewsPostVenueLink = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.venueLink
);

export const selectSelectedNewsPostMiniGalleryImages = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.miniGalleryImages
);

export const selectSelectedNewsPostVideoEmbed = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.videoEmbed
);

export const selectSelectedNewsPostScheduledTime = createSelector(
  selectSelectedNewsPost,
  (post) => post && post.scheduledTime
);
