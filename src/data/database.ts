import bcrypt from 'bcryptjs';

export const users: any[] = [
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

export const posts: any[] = [
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

export const comments: any[] = [
  {
    id: '1',
    content: 'Great post!',
    postId: '1',
    authorId: '2',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    content: 'Thanks for sharing',
    postId: '1',
    authorId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    content: 'Very informative',
    postId: '2',
    authorId: '1',
    createdAt: new Date().toISOString()
  }
];

export const findUserById = (id: string) => users.find(user => user.id === id);
export const findUserByEmail = (email: string) => users.find(user => user.email === email);
export const findCommentsByPostId = (postId: string) => comments.filter(comment => comment.postId === postId);