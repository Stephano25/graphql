import bcrypt from 'bcryptjs';
import { users, posts, findUserByEmail, findUserById } from '../data/database.js';
import { generateToken } from '../middleware/auth.js';
import { MutationResolvers } from '../types/resolvers-types.js';
import { Post } from '../types/index.js';

export const Mutation: MutationResolvers = {
  login: async (_, { email, password }) => {
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
  
  createPost: (_, { input }, { user }) => {
    if (!user) {
      throw new Error('You must be logged in to create a post');
    }
    
    const newPost: Post = {
      id: String(posts.length + 1),
      title: input.title,
      content: input.content,
      authorId: user.id,
      published: input.published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    return newPost;
  },
  
  updatePost: (_, { id, input }, { user }) => {
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
    
    const updatedPost: Post = {
      ...post,
      ...input,
      updatedAt: new Date().toISOString()
    };
    
    posts[postIndex] = updatedPost;
    return updatedPost;
  },
  
  deletePost: (_, { id }, { user }) => {
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