import { IResolvers } from '@graphql-tools/utils';
import { UserDocument } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

const resolvers: IResolvers = {
  Query: {
    getUser: async (
      _: any,
      args: { friendlyId: string }
    ): Promise<UserDocument | null> => {
      const { friendlyId } = args;
      return UserModel.findOne({ friendlyId });
    },
    users: async (): Promise<UserDocument[]> => {
      const users = await UserModel.find({});
      return users;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { username: string; age: number; password: string }
    ) => {
      const { username, age, password } = args;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new UserModel({ username, age, password: hashedPassword });
      await user.save();
      return user;
    },
  },
};

export default resolvers;
