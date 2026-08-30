// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;
let currentModel = null;

function init() {
    // 初始化场景、相机、渲染器等（保持原有代码不变）
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;

    // 灯光设置（保持原有代码不变）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 创建文件选择输入
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.glb';
    fileInput.style.position = 'fixed';
    fileInput.style.top = '10px';
    fileInput.style.left = '10px';
    fileInput.style.zIndex = '1000';
    document.body.appendChild(fileInput);

    // 文件选择监听
    fileInput.addEventListener('change', handleFileSelect);

    // 动画循环（保持原有代码不变）
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    // 窗口调整处理（保持原有代码不变）
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function handleFileSelect(event) {
    const files = event.target.files[0];
    if (!files || files.length === 0) return;

    const file = files; // 关键修复：获取第一个文件对象
    const loader = new GLTFLoader();
    const reader = new FileReader();

    reader.onload = function(e) {
        const arrayBuffer = e.target.result;

        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }

        loader.parse(
            arrayBuffer,
            '',
            (gltf) => {
                currentModel = gltf.scene;
                scene.add(currentModel);
                adjustCameraToModel(currentModel);
            },
            (error) => {
                console.error('模型加载错误:', error);
                showError('无法加载选中的模型文件');
            }
        );
    };

    reader.onerror = (error) => {
        console.error('文件读取错误:', error);
        showError('无法读取文件');
    };

    reader.readAsArrayBuffer(file); // 现在传递的是正确的File对象
}



function adjustCameraToModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / 2 * Math.tan(fov / 2)) * 1.5;

    camera.position.set(center.x, center.y, cameraZ);
    camera.lookAt(center);
    controls.update();
}

function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.style.position = 'fixed';
    errorElement.style.top = '30px';
    errorElement.style.left = '30px';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    
    setTimeout(() => {
        document.body.removeChild(errorElement);
    }, 5000);
}

// 初始化场景
init();
