import bcrypt from 'bcryptjs';
import { users, posts, findUserByEmail } from '../data/database';
import { generateToken } from '../middleware/auth';

export const Mutation = {
  login: async (_: any, { email, password }: { email: string; password: string }) => {
    const user = findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    
    const token = generateToken(user);
    return { token, user };
  },
  
  createPost: (_: any, { input }: any, { user }: any) => {
    if (!user) {
      throw new Error('You must be logged in to create a post');
    }
    
    const newPost = {
      id: String(posts.length + 1),
      ...input,
      authorId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    return newPost;
  },
  
  updatePost: (_: any, { id, input }: any, { user }: any) => {
    if (!user) {
      throw new Error('You must be logged in to update a post');
    }
    
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const post = posts[postIndex];
    if (post.authorId !== user.id) {
      throw new Error('You can only update your own posts');
    }
    
    const updatedPost = {
      ...post,
      ...input,
      updatedAt: new Date().toISOString()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  },
  
  deletePost: (_: any, { id }: { id: string }, { user }: any) => {
    if (!user) {
      throw new Error('You must be logged in to delete a post');
    }
    
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const post = posts[postIndex];
    if (post.authorId !== user.id) {
      throw new Error('You can only delete your own posts');
    }
    
    posts.splice(postIndex, 1);
    return true;
  }
};