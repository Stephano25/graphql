import { users, posts, findUserById } from '../data/database.js';
import { QueryResolvers } from '../types/resolvers-types.js';

export const Query: QueryResolvers = {
  users: () => users,
  
  user: (_, { id }) => {
    const user = findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  },
  
  posts: (_, { page = 1, limit = 10 }) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = posts.slice(start, end);
    const total = posts.length;
    
    return {
      posts: paginatedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  },
  
  post: (_, { id }) => {
    const post = posts.find(post => post.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  },
  
  me: (_, __, { user }) => {
    if (!user) throw new Error('Not authenticated');
    return user;
  }
};