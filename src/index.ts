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

// const app = express();
// const port = process.env.PORT || 4000;

// const bootstrapServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//   });
//   await server.start();

//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use('/graphql', expressMiddleware(server));

//   app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

//   app.listen(port, () => {
//     console.log(`🚀 Express ready at http://localhost:${port}`);
//     console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
//   });
// };

// bootstrapServer();
