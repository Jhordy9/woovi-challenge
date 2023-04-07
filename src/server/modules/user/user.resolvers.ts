import { IResolvers } from '@graphql-tools/utils';
import { UserDocument } from './user.interface';
import UserModel from './user.model';

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
    createUser: async (_: any, args: { username: string; age: number }) => {
      const { username, age } = args;
      const user = new UserModel({ username, age });
      await user.save();
      return user;
    },
  },
};

export default resolvers;
