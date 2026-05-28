import { findPostsByUserId, findCommentsByAuthorId } from '../data/database';

export const User = {
  posts: (parent: any) => {
    return findPostsByUserId(parent.id);
  },
  comments: (parent: any) => {
    // Retourner les vrais commentaires de l'utilisateur
    return findCommentsByAuthorId(parent.id);
  }
};