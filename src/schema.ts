export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
    createdAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreatePostInput {
    title: String!
    content: String!
    published: Boolean!
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }

  type PostsResult {
    posts: [Post!]!
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts(page: Int = 1, limit: Int = 10): PostsResult!
    post(id: ID!): Post
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;