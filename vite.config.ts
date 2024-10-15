// vite.config.ts

import { defineConfig, Plugin, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// log start development plugin
import vitePluginLogStart from './vite-plugin-log-start';

// Console plugin
const GEADEZIST = (): Plugin => {
  return {
    name: 'console-plugin',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        console.log(`
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJ    SJSJS      JSJSJS
JSJSJSJSJSJSJSJSJ    SJS          JSJS
JSJSJSJSJSJSJSJSJ    SJS     JSJSJSJSJ
JSJSJSJSJSJSJSJSJ    SJSJ     SJSJSJSJ
JSJSJSJSJSJSJSJSJ    SJSJSJ     SJSJSJ
JSJSJSJSJSJSJSJSJ    SJSJSJSJ     JSJS
JSJSJSJSJSJSJSJSJ    SJSJSJSJS     JSJ
JSJSJSJSJS     JS    JSJS          JSJ
JSJSJSJSJSJ          SJSJSJ      SJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
JSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJSJS
          \n ODAMCHALAR, 🫠 🫠 😴\n GEADEZIST\n`);
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
