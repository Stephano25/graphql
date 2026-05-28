import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: './index.js#Context',
      },
    },
  },
};

export default config;