import { findUserById, posts } from '../data/database.js';
import { CommentResolvers } from '../types/resolvers-types.js';

export const Comment: CommentResolvers = {
  author: async (parent, _, { userLoader }) => {
    const user = await userLoader.load(parent.authorId);
    if (!user) throw new Error('Author not found');
    return user;
  },
  post: (parent) => {
    const post = posts.find(post => post.id === parent.postId);
    if (!post) throw new Error('Post not found');
    return post;
  }
};