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

export interface CreatePostInput {
  title: string;
  content: string;
  published: boolean;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface PostsResult {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Context {
  user: User | null;
  userLoader: ReturnType<typeof import('../dataloaders/userLoader.js').createUserLoader>;
}

export interface JWTPayload {
  userId: string;
  email: string;
}