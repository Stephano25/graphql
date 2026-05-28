import { findUserById, findCommentsByPostId } from '../data/database';

export const Post = {
  author: (parent: any) => {
    const user = findUserById(parent.authorId);
    if (!user) throw new Error('Author not found');
    return user;
  },
  comments: (parent: any) => {
    return findCommentsByPostId(parent.id);
  }
};