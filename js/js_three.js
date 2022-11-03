
// Imports Three.js
import * as THREE from "https://unpkg.com/three@0.145.0/build/three.module.js";
 
// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    // Loads used textures
    const loader = new THREE.TextureLoader();    
    const displacementMap = loader.load("images/displacementMap2.png")
    const alphaMap = loader.load("images/alphaMap.png")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("canvas_element");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("element") });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);

     // Wireframe plane
     const wMaterial = new THREE.MeshStandardMaterial({
        color: "white", displacementMap, displacementScale: 0.5, alphaMap, transparent: true, wireframe: true, depthTest: false, opacity: 0.25
    }); const wPlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 128, 128), wMaterial);
    wPlane.rotation.x = 5;
    scene.add(wPlane);

    // Lights
    const pointLight = new THREE.PointLight(0x2283d9, 2.3);
    pointLight.position.x = 6.5;
    pointLight.position.y = 2;
    pointLight.position.z = 6.5;
    scene.add(pointLight);

    let trueDisplacement = 0.15;
    let direction = 0;
    let displacementMax = 0.25;
    let displacementMin = -0.25;
    let displacementRate = 0.0005;

    // Event handling
    document.addEventListener("mousemove", animateTerrain);
    let mouseY = 0;
    function animateTerrain(event) { mouseY = event.clientY; }

    // Main renderer loop
    const clock = new THREE.Clock();
    function animate() {

        // Rotates env
        const elapsedTime = clock.getElapsedTime();
        wPlane.rotation.z = 0.25 * elapsedTime;
        wPlane.material.displacementScale = trueDisplacement + 0.4 + mouseY / 4500;

        // REnders frame
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        if(direction == 0) {
            trueDisplacement -= displacementRate;
            if(trueDisplacement <= displacementMin) {
                direction = 1;
            }
        } else if(direction == 1) {
            trueDisplacement += displacementRate;
            if(trueDisplacement >= displacementMax) {
                direction = 0;
            }
        }

    } animate()

});
