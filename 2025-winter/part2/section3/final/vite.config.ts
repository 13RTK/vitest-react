/// <reference types="vitest/config" />

import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8', // or 'istanbul'
      include: ['src/components/*.{ts,tsx}'],
    },

    browser: {
      enabled: true,
      provider: playwright(),
      // https://vitest.dev/config/browser/playwright
      instances: [{ browser: 'chromium' }],
    },
  },
});
