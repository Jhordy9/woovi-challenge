import { Document, model, Schema } from 'mongoose';

export interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDocument extends Document, Post {}

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { versionKey: false }
);

export const PostModel = model<PostDocument>('Post', postSchema);
