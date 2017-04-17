import { createSelector } from 'reselect'

const newsPostsSelector = (state) => state.newsPosts;

export const selectNewsPostsPost = (state, id) => state.newsPosts.filter((p) => p._id === id); 

export const selectedNewsPostSelector = (state) => state.selectedNewsPost;
