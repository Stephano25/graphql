import { posts } from '../data/database';

// export const Comment: CommentResolvers = {
export const Comment = {
  author: async (parent: any, _: any, { userLoader }: any) => {
    const user = await userLoader.load(parent.authorId);
    if (!user) throw new Error('Author not found');
    return user;
  },
  post: (parent: any) => {
    const post = posts.find(post => post.id === parent.postId);
    if (!post) throw new Error('Post not found');
    return post;
  }
};