import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserDocument } from '../user/user.interface';
import { AuthPayload } from './auth.model';
import UserModel from '../user/user.model';

const createToken = (user: UserDocument): string => {
  return sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};

export const authResolvers = {
  Mutation: {
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ): Promise<AuthPayload> => {
      const user = await UserModel.findOne({ username });

      if (!user) {
        throw new Error('Invalid login');
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid login');
      }

      const token = createToken(user);

      return {
        token,
        user,
      };
    },
  },
};
