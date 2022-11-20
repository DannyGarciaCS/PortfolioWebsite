
// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    // 3D variables initialization
    let chocobo;
    var mixer;

    // Loads used textures
    const loader = new THREE.TextureLoader();
    const map = loader.load("images/back.webp")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("canvas_element");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("element"), alpha:true });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);

    // Loads GLTF scene
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load("model/scene.gltf", function(gltf){

        // Gets chocobo into the scene
        scene.add(gltf.scene);
        chocobo = gltf.scene.children[0];
        chocobo.rotation.z = 2

        // Animates chocobo
        mixer = new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });

        // Executes main loop after model loaded
        animate();
    });

    const backdropMaterial = new THREE.MeshBasicMaterial({
    map, transparent: true
    }); const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 1, 1), backdropMaterial);
    let backdropY = 1.0;
    backdrop.rotation.x = 6.3;
    backdrop.position.y = backdropY;
    backdrop.position.z = -1;
    scene.add(backdrop);

    // Event handling
    document.addEventListener("mousemove", animateTerrain);
    let mouseY = 0;
    let mouseX = 0;
    function animateTerrain(event) {
        mouseY = event.clientY;
        mouseX = event.clientX;
    }

    // Main renderer loop
    function animate() {

        // Moves backdrop based on mouse position
        let xTarget = 0;
        if(mouseX != 0) { xTarget = (-mouseX + (screen.width / 2)) / 6000 ; }
        else { xTarget = 0; }
        gsap.to(backdrop.position, {
            x: xTarget,
            y: backdropY + mouseY / 6000,
            duration: 1
        })

        // Rotates chocobo
        chocobo.rotation.z -= 0.0005;

        // Moves chocobo based on mouse position
        gsap.to(chocobo.position, {
            x: -xTarget,
            y: -mouseY / 6000,
            duration: 1
        })

        // Moves chocobo's animation
        mixer.update(0.01);

        // Renders frame
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
});
