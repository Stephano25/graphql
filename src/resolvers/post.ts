import { findCommentsByPostId } from '../data/database';

export const Post = {
  author: async (parent: any, _: any, { userLoader }: any) => {
    const user = await userLoader.load(parent.authorId);
    if (!user) throw new Error('Author not found');
    return user;
  },
  comments: (parent: any) => {
    return findCommentsByPostId(parent.id);
  }
};