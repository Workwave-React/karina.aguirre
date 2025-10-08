import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // needed for React components & DOM
    globals: true,
    setupFiles: './tests/setup.ts',
  },
});
