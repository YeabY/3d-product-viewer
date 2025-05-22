import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer, product) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('info-panel');
    const partNameElement = document.getElementById('part-name');
    const partDescriptionElement = document.getElementById('part-description');
    const partDetails = document.getElementById('part-details');

    // Show initial instructions
    infoPanel.classList.add('visible');
    partNameElement.textContent = product.userData.name;
    partDescriptionElement.textContent = product.userData.instructions;
    partDetails.classList.add('visible');

    // Store original materials, positions, and scales
    const originalMaterials = new Map();
    const originalPositions = new Map();
    const originalScales = new Map();
    const hoveredObjects = new Set();

    product.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            originalMaterials.set(child, child.material.clone());
            originalPositions.set(child, child.position.clone());
            originalScales.set(child, child.scale.clone());
        }
    });

    // Animation variables
    const popOutDistance = 0.3; // Distance to pop out
    const popOutSpeed = 0.1; // Speed of pop out animation
    const popInSpeed = 0.15; // Speed of pop in animation

    // Handle mouse move for hover effect
    renderer.domElement.addEventListener('mousemove', (event) => {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(product.children, true);

        // Reset all materials
        product.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = originalMaterials.get(child);
            }
        });

        // Clear previous hovered objects
        hoveredObjects.forEach(obj => {
            if (!intersects.some(intersect => intersect.object === obj)) {
                hoveredObjects.delete(obj);
            }
        });

        // Handle new hovered object
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            if (hoveredObject instanceof THREE.Mesh) {
                // Show info panel
                infoPanel.classList.add('visible');
                partNameElement.textContent = hoveredObject.userData.name;
                partDescriptionElement.textContent = hoveredObject.userData.description;
                partDetails.classList.add('visible');

                // Visual feedback
                hoveredObject.material = hoveredObject.material.clone();
                hoveredObject.material.emissive = new THREE.Color(0x00ffff); // Cyan glow
                hoveredObject.material.emissiveIntensity = 0.4;

                // Add to hovered objects set
                hoveredObjects.add(hoveredObject);
            }
        } else {
            // Hide info panel when not hovering
            infoPanel.classList.remove('visible');
            partDetails.classList.remove('visible');
        }
    });

    // Animation function for smooth pop out/in
    function animatePopEffect() {
        product.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const originalPosition = originalPositions.get(child);
                const originalScale = originalScales.get(child);
                
                if (hoveredObjects.has(child)) {
                    // Calculate direction to pop out (towards camera)
                    const direction = new THREE.Vector3();
                    direction.subVectors(camera.position, child.position).normalize();
                    
                    // Smoothly move to pop out position
                    child.position.lerp(
                        originalPosition.clone().add(direction.multiplyScalar(popOutDistance)),
                        popOutSpeed
                    );
                    
                    // Smoothly scale up
                    const targetScale = originalScale.clone().multiplyScalar(1.1);
                    child.scale.lerp(targetScale, popOutSpeed);
                } else {
                    // Smoothly return to original position
                    child.position.lerp(originalPosition, popInSpeed);
                    child.scale.lerp(originalScale, popInSpeed);
                }
            }
        });
        
        requestAnimationFrame(animatePopEffect);
    }

    // Start animation loop
    animatePopEffect();

    // Handle click for part selection
    renderer.domElement.addEventListener('click', (event) => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(product.children, true);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            if (selectedObject instanceof THREE.Mesh) {
                // Visual feedback
                const originalMaterial = originalMaterials.get(selectedObject);
                selectedObject.material = originalMaterial.clone();
                selectedObject.material.emissive = new THREE.Color(0xff69b4); // Hot pink glow
                selectedObject.material.emissiveIntensity = 0.6;

                // Add rotation animation
                const originalRotation = selectedObject.rotation.clone();
                selectedObject.rotation.y += Math.PI * 2;

                // Reset after animation
                setTimeout(() => {
                    selectedObject.material = originalMaterial;
                    selectedObject.rotation.copy(originalRotation);
                }, 500);
            }
        }
    });
} 