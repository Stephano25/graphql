import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: './index#Context',
        makeResolverTypeCallable: true,
      },
    },
  },
  require: ['ts-node/register'],  // ← Ajouter cette ligne
};

export default config;