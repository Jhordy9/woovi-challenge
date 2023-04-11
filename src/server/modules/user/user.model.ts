import { Schema, model } from 'mongoose';
import { UserDocument } from './user.interface';

const UserSchema = new Schema<UserDocument>({
  friendlyId: String,
  username: String,
  age: Number,
  password: String,
});

const UserModel = model<UserDocument>('User', UserSchema);
export default UserModel;
