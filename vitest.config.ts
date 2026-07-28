import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      // cli.ts is the 2-line bin bootstrap - not importable from tests
      include: ['src/**/*.ts'],
      exclude: ['src/test/**', 'src/cli.ts'],
      // ponytail: floors ~5 pts under current v8 numbers; raise as tests grow
      thresholds: {
        statements: 60,
        branches: 80,
        functions: 85,
        lines: 60,
      },
    },
  },
});
