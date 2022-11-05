let house;
var mixer;
const gui = new dat.GUI({autoPlace: false})
gui.domElement.id = 'gui';
var customContainer = document.getElementById('my-gui-container');
customContainer.appendChild(gui.domElement);

// Waits for css to load
document.addEventListener("DOMContentLoaded", () => {

    // Loads used textures
    const loader = new THREE.TextureLoader();
    const map = loader.load("images/back.png")

    // Scene
    const scene = new THREE.Scene();
    const threeElement = document.getElementById("canvas_element");

    // Camera
    const camera = new THREE.PerspectiveCamera(75, threeElement.offsetWidth / threeElement.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 2.2);

    gui.add(camera.position, "x").min(-5).max(5);
    gui.add(camera.position, "y").min(-5).max(5);
    gui.add(camera.position, "z").min(-5).max(5);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById("element"), alpha:true });
    renderer.setSize(threeElement.offsetWidth, threeElement.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);



    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load("model/scene.gltf", function(gltf){

        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        house.rotation.z = 2

        mixer= new THREE.AnimationMixer(gltf.scene);
        gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play(); });
        scene.add(gltf.scene);

        animate();
    });

    const backdropMaterial = new THREE.MeshBasicMaterial({
    map, transparent: true
    }); const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 1, 1), backdropMaterial);
    let backdropY = 1.0;
    let backdropX = 0.0;
    backdrop.rotation.x = 6.3;
    backdrop.position.y = backdropY;
    backdrop.position.z = -1;
    scene.add(backdrop);
    gui.add(backdrop.position, "x").min(0).max(10);
    gui.add(backdrop.position, "y").min(0).max(10);
    gui.add(backdrop.position, "z").min(-10).max(0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

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

        // Rotates env
        let xTarget = 0;
        if(mouseX != 0) { xTarget = (-mouseX + 960) / 6000 ; }
        else { xTarget = 0; }
        gsap.to(backdrop.position, {
            x: xTarget,
            y: backdropY + mouseY / 6000,
            duration: 1
        })
        
        house.rotation.z -= 0.0005;

        gsap.to(house.position, {
            x: -xTarget,
            y: -mouseY / 6000,
            duration: 1
        })


        mixer.update( 0.01 )

        // REnders frame
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }

});
