import * as THREE from 'three';

export function createProduct() {
    const product = new THREE.Group();
    
    // Add instructions for user interaction
    product.userData.name = "Wooden Chair";
    product.userData.description = "A classic wooden chair with padded seat and metal footrest.";
    product.userData.instructions = "Hover over any part of the chair to see its details.";
    
    // Materials
    const woodMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x8B5C2A, // Warm brown
        metalness: 0.4,
        roughness: 0.35,
        clearcoat: 0.7,
        clearcoatRoughness: 0.2,
        reflectivity: 0.7,
        ior: 1.5
    });
    const seatMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x5C3A1E, // Darker brown for cushion
        metalness: 0.1,
        roughness: 0.4,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3,
        reflectivity: 0.5,
        ior: 1.4
    });
    const metalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc, // Light metallic
        metalness: 1.0,
        roughness: 0.2,
        reflectivity: 1.0,
        ior: 2.0
    });

    // Chair seat (padded/rounded)
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.2, 2.8), // Box for flat seat
        seatMaterial
    );
    seat.position.y = 2.1;
    seat.castShadow = true;
    seat.receiveShadow = true;
    seat.userData.name = "Chair Seat";
    seat.userData.description = "Flat, comfortable seat.";
    product.add(seat);

    // Boxy frame (front/back/side rails)
    const frameThickness = 0.15;
    const frameWidth = 3.0;
    const frameDepth = 3.0;
    const frameHeight = 2.0;
    // Front rail
    const frontRail = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, frameThickness, frameThickness),
        woodMaterial
    );
    frontRail.position.set(0, 1.1, 1.35);
    frontRail.userData.name = "Front Rail";
    frontRail.userData.description = "Horizontal support rail at the front of the chair.";
    product.add(frontRail);
    // Back rail
    const backRail = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, frameThickness, frameThickness),
        woodMaterial
    );
    backRail.position.set(0, 1.1, -1.35);
    backRail.userData.name = "Back Rail";
    backRail.userData.description = "Horizontal support rail at the back of the chair.";
    product.add(backRail);
    // Left rail
    const leftRail = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, frameThickness, frameDepth),
        woodMaterial
    );
    leftRail.position.set(-1.425, 1.1, 0);
    leftRail.userData.name = "Left Rail";
    leftRail.userData.description = "Side support rail on the left of the chair.";
    product.add(leftRail);
    // Right rail
    const rightRail = new THREE.Mesh(
        new THREE.BoxGeometry(frameThickness, frameThickness, frameDepth),
        woodMaterial
    );
    rightRail.position.set(1.425, 1.1, 0);
    rightRail.userData.name = "Right Rail";
    rightRail.userData.description = "Side support rail on the right of the chair.";
    product.add(rightRail);

    // Chair legs (longer)
    const legGeometry = new THREE.BoxGeometry(frameThickness, 2.2, frameThickness);
    const legY = 0.1 + 2.2 / 2;
    const legPositions = [
        [-1.425, legY, -1.35],
        [1.425, legY, -1.35],
        [-1.425, legY, 1.35],
        [1.425, legY, 1.35]
    ];
    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(...pos);
        leg.castShadow = true;
        leg.receiveShadow = true;
        leg.userData.name = `Chair Leg ${index + 1}`;
        leg.userData.description = "Sturdy wooden leg.";
        product.add(leg);
    });

    // Horizontal bars (footrest and supports)
    // Side bars (front-back)
    const barY = 0.7;
    const sideBarGeometry = new THREE.BoxGeometry(frameThickness, frameThickness, frameDepth - 0.3);
    const leftBar = new THREE.Mesh(sideBarGeometry, woodMaterial);
    leftBar.position.set(-1.425, barY, 0);
    leftBar.userData.name = "Left Support Bar";
    leftBar.userData.description = "Horizontal support bar on the left side.";
    product.add(leftBar);
    const rightBar = new THREE.Mesh(sideBarGeometry, woodMaterial);
    rightBar.position.set(1.425, barY, 0);
    rightBar.userData.name = "Right Support Bar";
    rightBar.userData.description = "Horizontal support bar on the right side.";
    product.add(rightBar);
    // Back bar (left-right)
    const backBarGeometry = new THREE.BoxGeometry(frameWidth - 0.3, frameThickness, frameThickness);
    const backBar = new THREE.Mesh(backBarGeometry, woodMaterial);
    backBar.position.set(0, barY, -1.35);
    backBar.userData.name = "Back Support Bar";
    backBar.userData.description = "Horizontal support bar at the back.";
    product.add(backBar);
    // Front footrest (metal)
    const footrest = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth - 0.3, frameThickness * 0.7, frameThickness * 1.2),
        metalMaterial
    );
    footrest.position.set(0, barY, 1.35);
    footrest.userData.name = "Footrest";
    footrest.userData.description = "Metal footrest at the front of the chair.";
    product.add(footrest);

    // Spindle backrest (vertical rods)
    const numSpindles = 7;
    const spindleSpacing = 0.3;
    const spindleHeight = 2.4;
    const spindleTopY = 6.6;
    const spindleBottomY = 0;
    for (let i = 0; i < numSpindles; i++) {
        const x = -0.9 + i * spindleSpacing;
        const spindle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, spindleHeight, 12),
            woodMaterial
        );
        spindle.position.set(x, (spindleTopY + spindleBottomY) / 2, -1.35);
        spindle.userData.name = `Backrest Spindle ${i + 1}`;
        spindle.userData.description = "Vertical wooden rod in the backrest.";
        product.add(spindle);
    }
    // Backrest frame (top bar)
    const backrestTop = new THREE.Mesh(
        new THREE.BoxGeometry(frameWidth, frameThickness, frameThickness),
        woodMaterial
    );
    backrestTop.position.set(0, 4.5, -1.35);
    backrestTop.userData.name = "Backrest Top Bar";
    backrestTop.userData.description = "Horizontal bar at the top of the backrest.";
    product.add(backrestTop);
    // Backrest frame (side posts)
    const backrestPostGeometry = new THREE.BoxGeometry(frameThickness, 2.6, frameThickness);
    const leftPost = new THREE.Mesh(backrestPostGeometry, woodMaterial);
    leftPost.position.set(-1.425, 3.5, -1.35);
    leftPost.userData.name = "Left Backrest Post";
    leftPost.userData.description = "Vertical post on the left side of the backrest.";
    product.add(leftPost);
    const rightPost = new THREE.Mesh(backrestPostGeometry, woodMaterial);
    rightPost.position.set(1.425, 3.5, -1.35);
    rightPost.userData.name = "Right Backrest Post";
    rightPost.userData.description = "Vertical post on the right side of the backrest.";
    product.add(rightPost);

    return product;
} 