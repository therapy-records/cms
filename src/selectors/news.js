import { createSelector } from 'reselect'

export const filterNewsPostsPost = (state, id) => state.news.posts.filter((p) => p._id === id);

export const selectNewsPostsPost = createSelector(
  filterNewsPostsPost,
  (postArr) => postArr && postArr[0]
);

export const selectNewsPostsPostTitle = createSelector(
  selectNewsPostsPost,
  (post) => post && post.title
);

export const selectNewsPostsPostBodyMain = createSelector(
  selectNewsPostsPost,
  (post) => post && post.bodyMain
);

export const selectNewsPostsPostMainImageUrl = createSelector(
  selectNewsPostsPost,
  (post) => post && post.mainImageUrl
);

export const selectNewsPostsPostTicketsLink = createSelector(
  selectNewsPostsPost,
  (post) => post && post.ticketsLink
);

export const selectNewsPostsPostVenueLink = createSelector(
  selectNewsPostsPost,
  (post) => post && post.venueLink
);

export const selectNewsPostsPostMiniGalleryImages = createSelector(
  selectNewsPostsPost,
  (post) => post && post.miniGalleryImages
);

export const selectNewsPostsPostVideoEmbed = createSelector(
  selectNewsPostsPost,
  (post) => post && post.videoEmbed
);

export const selectNewsPostsPostScheduledTime = createSelector(
  selectNewsPostsPost,
  (post) => post && post.scheduledTime
)

export const selectedNewsPostSelector = (state) => state.selectedNewsPost;
