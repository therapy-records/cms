import { createSelector } from 'reselect'

const newsPostsSelector = (state) => state.news.posts;

export const selectNewsPostsPost = (state, id) => state.news.posts.filter((p) => p._id === id); 

export const selectNewsPostsPostTitle = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].title
);

export const selectNewsPostsPostBodyMain = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].bodyMain
);

export const selectNewsPostsPostImageUrl = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].imageUrl
);

export const selectedNewsPostSelector = (state) => state.selectedNewsPost;
