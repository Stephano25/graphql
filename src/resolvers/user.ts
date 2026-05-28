import { findPostsByUserId } from '../data/database';

// export const User: UserResolvers = {
export const User = {
  posts: (parent: any) => {
    return findPostsByUserId(parent.id);
  },
  comments: (parent: any) => {
    return [];
  }
};