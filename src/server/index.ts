import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { connectDatabase } from './utils/database';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const app = new Koa();

const typeDefs = loadSchemaSync('src/**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = mergeResolvers(loadFilesSync('src/**/*.resolvers.*'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT || 4000;

(async () => {
  await server.start();
  server.applyMiddleware({ app });
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
