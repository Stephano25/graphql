import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import { getUserFromToken } from './middleware/auth.js';
import { createUserLoader } from './dataloaders/userLoader.js';
import { Context } from './types/index.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const PORT = parseInt(process.env.PORT || '4000');

async function startServer() {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    introspection: true,
    status400ForVariableCoercionErrors: true,
    formatError: (formattedError) => {
      console.error('GraphQL Error:', formattedError);
      return formattedError;
    },
  });
  
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }): Promise<Context> => {
      // Extraire le token du header Authorization
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace('Bearer ', '');
      const user = getUserFromToken(token);
      
      // Créer une nouvelle instance de DataLoader pour chaque requête
      const userLoader = createUserLoader();
      
      console.log(`📝 Request from ${user ? user.email : 'anonymous user'}`);
      
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
  🔑 JWT Secret: ${process.env.JWT_SECRET ? '✓ Loaded' : '✗ Missing'}
  `);
}

// Gestion des erreurs non capturées
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Démarrer le serveur
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});