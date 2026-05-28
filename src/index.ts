import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';  // Enlever .js
import { getUserFromToken } from './middleware/auth';  // Enlever .js
import { createUserLoader } from './dataloaders/userloader';  // Enlever .js
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '4000');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
  
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace('Bearer ', '');
      const user = getUserFromToken(token);
      const userLoader = createUserLoader();
      
      return {
        user,
        userLoader,
      };
    },
    listen: { port: PORT },
  });
  
  console.log(`
  🚀 Server ready at: ${url}
  📊 GraphQL endpoint: ${url}
  `);
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
});