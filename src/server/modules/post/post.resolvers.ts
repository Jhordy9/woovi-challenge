import { PostModel } from './post.model';

export const resolvers = {
  Query: {
    async getPost(_: any, { id }: { id: string }) {
      return await PostModel.findById(id);
    },
    async getAllPosts() {
      return await PostModel.find();
    },
  },
  Mutation: {
    async createPost(
      _: any,
      {
        title,
        content,
        author,
      }: { title: string; content: string; author: string }
    ) {
      const post = new PostModel({
        title,
        content,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await post.save();
      return post;
    },

    async updatePost(
      _: any,
      { id, title, content }: { id: string; title?: string; content?: string }
    ) {
      const post = await PostModel.findById(id);
      if (!post) throw new Error('Post not found');
      if (title) post.title = title;
      if (content) post.content = content;
      post.updatedAt = new Date();
      await post.save();
      return post;
    },

    async deletePost(_: any, { id }: { id: string }) {
      const post = await PostModel.findById(id);
      if (!post) throw new Error('Post not found');
      await PostModel.findByIdAndDelete(id);
      return post;
    },
  },
};
