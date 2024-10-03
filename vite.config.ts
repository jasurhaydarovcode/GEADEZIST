import { defineConfig, Plugin, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

const GEADEZIST = (): Plugin => {
  return {
    name: 'my-plugin',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        console.log('Happy Hacking, 🫠 🫠 😴\n GEADEZIST');
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), GEADEZIST()],
  server: {
    port: 9999,
  },
});
