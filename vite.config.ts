import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    assetsInclude: ['**/*.glb'],
    base: env.VITE_APP_BASE_PATH ?? '/',
    server: {
      allowedHosts: ['intimate-seasnail-infinitely.ngrok-free.app'],
    },
    resolve: {
      alias: {
        '@src': path.resolve('src'),
        '@assets': path.resolve('src/assets'),
        '@core': path.resolve('src/core'),
        '@routers': path.resolve('src/routers'),
        '@layouts': path.resolve('src/layouts'),
        '@pages': path.resolve('src/pages'),
        '@components': path.resolve('src/components'),
        '@ui': path.resolve('src/ui'),
        '@contexts': path.resolve('src/contexts'),
        '@constants': path.resolve('src/constants'),
        '@hooks': path.resolve('src/hooks'),
        '@styles': path.resolve('src/styles'),
        '@store': path.resolve('src/store'),
        '@services': path.resolve('src/services'),
        '@utils': path.resolve('src/utils'),
        '@apptypes': path.resolve('src/types'),
      },
    },
  };
});
