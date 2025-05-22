import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

// Initialize the scene
const { scene, camera, renderer, controls } = initScene();

// Create the product (a simple chair made of basic geometries)
const product = createProduct();
scene.add(product);

// Add lighting
addLighting(scene);

// Setup interaction
setupInteraction(scene, camera, renderer, product);

// Setup camera animation
setupCameraAnimation(camera, controls);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate(); 