export function setupCameraAnimation(camera, controls) {
    let isAutoRotating = true;
    let rotationSpeed = 10; 
    let lastTime = performance.now();

    // Toggle auto-rotation when user interacts with controls
    controls.addEventListener('start', () => {
        isAutoRotating = false;
    });

    controls.addEventListener('end', () => {
        isAutoRotating = true;
    });

    // Animation function
    function animateCamera(time) {
        if (isAutoRotating) {
            const delta = (time - lastTime) / 1000; // Convert to seconds
            const rotation = (rotationSpeed * delta) * (Math.PI / 180); // Convert to radians

            // Rotate camera around the Y axis
            const radius = Math.sqrt(
                camera.position.x * camera.position.x +
                camera.position.z * camera.position.z
            );
            const currentAngle = Math.atan2(camera.position.z, camera.position.x);
            const newAngle = currentAngle + rotation;

            camera.position.x = radius * Math.cos(newAngle);
            camera.position.z = radius * Math.sin(newAngle);
            camera.lookAt(0, 0, 0);
        }

        lastTime = time;
        requestAnimationFrame(animateCamera);
    }

    // Start animation
    animateCamera(performance.now());
} 