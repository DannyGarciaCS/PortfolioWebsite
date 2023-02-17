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
    const map = loader.load("visuals/back.webp")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("canvasElement");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0.35, 0.85);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("element"), alpha:true });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);

    // Resizes canvas with window resize
    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
        const threeElement = document.getElementById("canvasElement");
        camera.aspect = threeElement.offsetWidth / threeElement.offsetHeight
        camera.updateProjectionMatrix();

        renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight)
    }

    console.log("Canvas X: " + threeElement.offsetWidth)
    console.log("Canvas Y: " + threeElement.offsetHeight)

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, intensity=2));
    scene.add(new THREE.DirectionalLight(0xffffff, intensity=1));

    // Handles model load
    let modelLoad = new Promise(function(resolve, reject) {
        try {

            // 3D variables initialization
            let model;
            var mixer;

            // Loads GLTF scene
            const gltfLoader = new THREE.GLTFLoader();
            gltfLoader.load("visuals/model.glb", function(gltf){

                // Gets model into the scene
                scene.add(gltf.scene);
                model = gltf.scene;
                model.position.y = 10
                model.rotation.y = 2.5

                // Animates model
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
            backdrop.rotation.x = 0;
            backdrop.position.y = 10.0;
            backdrop.position.z = -3;
            scene.add(backdrop);

            // Main renderer loop
            function animate() {

                // Moves backdrop based on mouse position if not on portrait display
                let motionVector = {x: 0, y: 0};
                if(screen.width > screen.height) {
                    if(mouse.x != 0) { motionVector.x = (-mouse.x + (screen.width / 2)) / (screen.width * 3) ; }
                    if(mouse.y != 0) { motionVector.y = (-mouse.y + (screen.height / 2)) / (screen.width * 2); }
                    gsap.to(backdrop.position, { x: motionVector.x * 2, y: 1 - motionVector.y, duration: 1 })
                }

                // Animates model
                model.rotation.y -= 0.0005;
                if(screen.width > screen.height) {
                    gsap.to(model.position, { x: -motionVector.x / 2, y: 0.22 -mouse.y / (window.innerWidth * 3) / 2, duration: 1 })
                }
                mixer.update(0.0065);

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
