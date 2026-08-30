import { defineConfig } from 'vite'
import path from 'path'

// 获取 node_modules 绝对路径
const nodeModulesPath = path.resolve(__dirname, 'node_modules')

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      three: path.resolve(nodeModulesPath, 'three/build/three.module.min.js'),
      GLTFLoader: path.resolve(nodeModulesPath, 'three/examples/jsm/loaders/GLTFLoader.js')
    }
  }
})