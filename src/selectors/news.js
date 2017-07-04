import { createSelector } from 'reselect'

export const selectNewsPostsPost = (state, id) => state.news.posts.filter((p) => p._id === id);

export const selectNewsPostsPostTitle = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].title
);

export const selectNewsPostsPostBodyMain = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].bodyMain
);

export const selectNewsPostsPostMainImageUrl = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].mainImageUrl
);

export const selectNewsPostsPostTicketsLink = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].ticketsLink
);

export const selectNewsPostsPostVenueLink = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].venueLink
);

export const selectNewsPostsPostMiniGallery = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].miniGallery
);

export const selectNewsPostsPostVideoEmbed = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].videoEmbed
);

export const selectedNewsPostSelector = (state) => state.selectedNewsPost;
