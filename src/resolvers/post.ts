import { findUserById, findCommentsByPostId } from '../data/database.js';
import { PostResolvers } from '../types/resolvers-types.js';

export const Post: PostResolvers = {
  author: async (parent, _, { userLoader }) => {
    // Utilisation de DataLoader pour batch loading
    const user = await userLoader.load(parent.authorId);
    if (!user) throw new Error('Author not found');
    return user;
  },
  comments: (parent) => {
    return findCommentsByPostId(parent.id);
  }
};