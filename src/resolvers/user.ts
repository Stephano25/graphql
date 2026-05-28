import { findPostsByUserId, findCommentsByPostId } from '../data/database.js';
import { UserResolvers } from '../types/resolvers-types.js';

export const User: UserResolvers = {
  posts: (parent) => {
    return findPostsByUserId(parent.id);
  },
  comments: (parent) => {
    // Pour simplifier, on retourne un tableau vide
    // En réalité, il faudrait une relation comments par authorId
    return [];
  }
};