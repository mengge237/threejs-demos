# Three.js 3D 交互 Demo 集（threejs-demos）

Three.js 3D 场景与动画练习集合，包含 Vite 工程化项目与单页 Demo。

## ✨ 内容

- 🎮 **Three.js 3D 动画页**（`threejs-animation.html`）：场景/相机/渲染器，GLTF 模型加载
- 📦 **Vite 工程项目**（`my-threejs-project/`）：模块化 3D 项目骨架，含 GLB 模型资源

## 🛠 技术栈

| 组件 | 技术 |
|---|---|
| 3D 引擎 | Three.js |
| 构建 | Vite 6 |
| 语言 | JavaScript（ES Modules） |
| 资源 | GLTF / GLB 模型 |

## 🚀 快速开始

```bash
# Vite 工程
cd my-threejs-project
npm install
npm run dev        # 开发
npm run build      # 构建
```

单页 Demo（`threejs-animation.html`）直接浏览器打开即可。

## 📁 项目结构

```
├── threejs-animation.html      # 3D 动画单页
└── my-threejs-project/         # Vite 工程
    ├── public/models/model.glb # 3D 模型
    └── src/main.js             # 场景/相机/渲染入口
```

## 🎯 学习要点

- Three.js 场景搭建、相机与渲染管线控制
- GLTF/GLB 模型加载与展示
- Vite 工程化组织 3D 项目
