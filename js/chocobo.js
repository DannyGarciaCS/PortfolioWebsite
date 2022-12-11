
// Waits for html and css to load
document.addEventListener("DOMContentLoaded", () => {

    // Mouse movement handling
    let mouse = {x: 0, y: 0};
    document.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    // Loads used textures
    const loader = new THREE.TextureLoader();
    const map = loader.load("images/back.webp")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("canvasElement");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("element"), alpha:true });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);

    let modelLoad = new Promise(function(resolve, reject) {

        try {

            // 3D variables initialization
            let chocobo;
            var mixer;

            // Loads GLTF scene
            const gltfLoader = new THREE.GLTFLoader();
            gltfLoader.load("models/chocobo.glb", function(gltf){

                // Gets chocobo into the scene
                scene.add(gltf.scene);
                chocobo = gltf.scene;
                chocobo.rotation.y = 2

                // Animates chocobo
                mixer = new THREE.AnimationMixer(gltf.scene);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });

                // Executes main loop after model loaded and increase opacity
                document.getElementById("canvasElement").style.animationPlayState = "running";
                animate();

            });

            // Scene backdrop
            const backdropMaterial = new THREE.MeshBasicMaterial({ map, transparent: true });
            const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 1, 1), backdropMaterial);
            backdrop.rotation.x = 6.3;
            backdrop.position.y = 1.0;
            backdrop.position.z = -1;
            scene.add(backdrop);

            // Main renderer loop
            function animate() {

                // Moves backdrop based on mouse position if not on portrait display
                let motionVector = {x: 0, y: 0};
                if(screen.width > screen.height) {
                    if(mouse.x != 0) { motionVector.x = (-mouse.x + (screen.width / 2)) / (screen.width * 3) ; }
                    if(mouse.y != 0) { motionVector.y = (-mouse.y + (screen.height / 2)) / (screen.width * 2) ; }
                    gsap.to(backdrop.position, { x: motionVector.x, y: 1 - motionVector.y, duration: 1 })
                }

                // Animates chocobo
                chocobo.rotation.y -= 0.001;
                if(screen.width > screen.height) {
                    gsap.to(chocobo.position, { x: -motionVector.x, y: -mouse.y / (window.innerWidth * 3), duration: 1 })
                }
                mixer.update(0.015);

                // Renders frame
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }

            resolve("3D models loaded successfully");
        } catch (e) { reject(`Failed to load 3D model with error code: ${e}`); }

    });

    // Executes when promise finishes
    modelLoad.then(
        function(value) { console.log('%c' + value, "color: green;"); },
        function(error) { console.log('%c' + error, "color: red;"); }
    );
});
