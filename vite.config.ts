// vite.config.ts

import { defineConfig, Plugin, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { log } from './src/helpers/lib/logger'

// log start development plugin
import vitePluginLogStart from './vite-plugin-log-start';

// Console plugin
const GEADEZIST = (): Plugin => {
  return {
    name: 'console-plugin',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        log(`\n ODAMCHALAR, 🫠 🫠 😴\n GEADEZIST\n`);
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginLogStart({
      filePath: './dev-start-log.json',
      includeUser: true,
    }),
    GEADEZIST(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
  server: {
    host: '0.0.0.0',
    port: 777,
  },
});
