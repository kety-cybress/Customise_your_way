import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ This ensures all asset paths are relative (./assets/...) — perfect for S3
});
