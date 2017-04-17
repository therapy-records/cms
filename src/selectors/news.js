import { createSelector } from 'reselect'

const newsPostsSelector = (state) => state.newsPosts;

export const selectNewsPostsPost = (state, id) => state.newsPosts.filter((p) => p._id === id); 

export const selectNewsPostsPostTitle = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].title
);

export const selectNewsPostsPostMainBody = createSelector(
  selectNewsPostsPost,
  (post) => post[0] && post[0].mainBody
);

export const selectedNewsPostSelector = (state) => state.selectedNewsPost;
