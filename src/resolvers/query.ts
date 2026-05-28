import { users, posts, findUserById } from '../data/database';

export const Query = {
  users: () => users,
  
  user: (_: any, { id }: { id: string }) => {
    const user = findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  },
  
  posts: (_: any, { page = 1, limit = 10 }: { page: number; limit: number }) => {
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
  
  post: (_: any, { id }: { id: string }) => {
    const post = posts.find(post => post.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  },
  
  me: (_: any, __: any, { user }: any) => {
    if (!user) throw new Error('Not authenticated');
    return user;
  }
};