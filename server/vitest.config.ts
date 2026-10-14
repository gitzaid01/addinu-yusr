import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    hookTimeout: 300000, // 5 minutes for first-time MongoMemoryServer binary download
    testTimeout: 30000,
  },
});
