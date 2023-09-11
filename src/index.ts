import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Graphql ready at ${url}graphql`);
};

startServer();
