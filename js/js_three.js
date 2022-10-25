
// Imports Three.js
import * as THREE from "https://unpkg.com/three@0.145.0/build/three.module.js";

// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    // Initialize scene objects
    const scene = new THREE.Scene();
    const earthElement = document.getElementById("threejs_element");
    const camera = new THREE.PerspectiveCamera(75, earthElement.offsetWidth / earthElement.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("threejs") });

    // Main renderer loop
    function animate() {

        // Natural rotation
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    } animate()

});
