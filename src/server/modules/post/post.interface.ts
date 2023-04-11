import { Document } from 'mongoose';

export interface Post {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostDocument extends Document, Post {}
