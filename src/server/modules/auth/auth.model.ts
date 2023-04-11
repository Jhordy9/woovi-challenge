import { Document, model, Schema } from 'mongoose';
import { UserDocument } from '../user/user.interface';

export interface AuthPayload {
  token: string;
  user: UserDocument;
}

export interface AuthPayloadDocument extends Document, AuthPayload {}

const authPayloadSchema = new Schema<AuthPayload>({
  token: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const AuthPayloadModel = model<AuthPayloadDocument>(
  'AuthPayload',
  authPayloadSchema
);
