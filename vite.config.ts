import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windi from 'vite-plugin-windicss'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ reactivityTransform: true }), windi(), viteStaticCopy({
    targets: [
      {
        src: './src/assets/pages/*.pdf',
        dest: 'assets/pages'
      }
    ]
  })]
})
