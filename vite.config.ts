import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
})
