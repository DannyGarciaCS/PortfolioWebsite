
// Imports Three.js
import * as THREE from "https://unpkg.com/three@0.145.0/build/three.module.js";
 
// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    const loader = new THREE.TextureLoader();
    const displacementMap = loader.load("images/displacementMap.png")
    const alphaMap = loader.load("images/alphaMap.png")

    // Debugging GUI
    const gui = new dat.GUI();

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

     // Objects
     const material = new THREE.MeshStandardMaterial({color: "gray", displacementMap, displacementScale: 0.35, alphaMap, transparent: true, wireframe: true, depthTest: false});
     const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 64, 64), material);
     scene.add(plane);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);
 
     plane.rotation.x = 5;
     gui.add(plane.rotation, "x").min(0).max(10);
     gui.add(pointLight, "intensity").min(0).max(3);
     gui.add(pointLight.position, "x").min(-30).max(30);
     gui.add(pointLight.position, "y").min(-5).max(5);
     gui.add(pointLight.position, "z").min(-10).max(100);

     const col = { color: "#ffffff" }
     gui.addColor(col, "color").onChange(() => {
        pointLight.color.set(col.color);
     })

     const clock = new THREE.Clock()
     
    // Main renderer loop
    function animate() {

        const elapsedTime = clock.getElapsedTime();
        plane.rotation.z = 0.25 * elapsedTime;

        // Natural rotation
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    } animate()

});
