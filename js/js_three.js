
// Imports Three.js
import * as THREE from "https://unpkg.com/three@0.145.0/build/three.module.js";
 
// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    // Loads used textures
    const loader = new THREE.TextureLoader();    
    const map = loader.load("images/map.png")
    const displacementMap = loader.load("images/displacementMap.png")
    const alphaMap = loader.load("images/alphaMap.png")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("three_element");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("three") });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);

     // Main plane
     const mMaterial = new THREE.MeshStandardMaterial({
        color: "gray", displacementMap, displacementScale: 0.5, map, alphaMap, transparent: true, depthTest: false, opacity: 0.75
    }); const mPlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), mMaterial);
    mPlane.rotation.x = 5;
    scene.add(mPlane);

     // Wireframe plane
     const wMaterial = new THREE.MeshStandardMaterial({
        color: "white", displacementMap, displacementScale: 0.5, alphaMap, transparent: true, wireframe: true, depthTest: false, opacity: 0.25
    }); const wPlane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), wMaterial);
    wPlane.rotation.x = 5;
    scene.add(wPlane);

    // Lights
    const pointLight = new THREE.PointLight(0x2283d9, 2.3);
    pointLight.position.x = 6.5;
    pointLight.position.y = 2;
    pointLight.position.z = 6.5;
    scene.add(pointLight);

    // Event handling
    document.addEventListener("mousemove", animateTerrain);
    let mouseY = 0;
    function animateTerrain(event) { mouseY = event.clientY; }

    // Main renderer loop
    const clock = new THREE.Clock();
    function animate() {

        // Rotates env
        const elapsedTime = clock.getElapsedTime();
        mPlane.rotation.z = 0.25 * elapsedTime;
        wPlane.rotation.z = 0.25 * elapsedTime;

        mPlane.material.displacementScale = 0.4 + mouseY / 4500
        wPlane.material.displacementScale = 0.4 + mouseY / 4500

        // REnders frame
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    } animate()

});
