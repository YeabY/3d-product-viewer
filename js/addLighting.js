import * as THREE from 'three';

export function addLighting(scene) {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Main directional light (warm)
    const mainLight = new THREE.DirectionalLight(0xffd700, 1.2);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    // Fill light from the opposite side (cool)
    const fillLight = new THREE.DirectionalLight(0x4169e1, 0.6);
    fillLight.position.set(-5, 3, -5);
    fillLight.castShadow = true;
    scene.add(fillLight);

    // Rim light for edge highlighting (purple)
    const rimLight = new THREE.DirectionalLight(0x9370db, 0.4);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Add a subtle point light for extra dimension
    const pointLight = new THREE.PointLight(0x00ff00, 0.5, 10);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);
} 