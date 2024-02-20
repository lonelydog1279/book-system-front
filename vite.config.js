import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: false, //自动打开
    proxy: {
      "^/api": {
        target: "http://localhost:8080", // 真实接口地址, 后端给的基地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""), // 将ccc替换为空
      },
    }
  }, 
   test: {
    globals: true,
    // ... Specify options here.
    environment : "happy-dom"
  },
})
