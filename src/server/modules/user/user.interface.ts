import { Document } from 'mongoose';

export interface User {
  friendlyId: string;
  username: string;
  age: number;
  password: string;
}

export interface UserDocument extends User, Document {}
