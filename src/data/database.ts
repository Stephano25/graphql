import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
}

// Données simulées
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('password123', 10),
    createdAt: new Date().toISOString()
  }
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is my first post content',
    authorId: '1',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is my second post content',
    authorId: '2',
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'This is my third post content',
    authorId: '1',
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const comments: Comment[] = [
  {
    id: '1',
    content: 'Great post! Very informative.',
    postId: '1',
    authorId: '2',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    content: 'Thanks for sharing this amazing content!',
    postId: '1',
    authorId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    content: 'Very helpful, I learned a lot.',
    postId: '2',
    authorId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    content: 'Excellent post! Keep up the good work.',
    postId: '2',
    authorId: '2',
    createdAt: new Date().toISOString()
  }
];

// Helper functions
export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.authorId === userId);
};

export const findPostsByAuthorId = (authorId: string): Post[] => {
  return posts.filter(post => post.authorId === authorId);
};

export const findCommentsByPostId = (postId: string): Comment[] => {
  return comments.filter(comment => comment.postId === postId);
};

export const findCommentsByAuthorId = (authorId: string): Comment[] => {
  return comments.filter(comment => comment.authorId === authorId);
};