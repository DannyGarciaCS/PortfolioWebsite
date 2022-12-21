const boids = [];

// Sets up initial program status
function setup() {

    // Creates a canvas sized to the screen
    let parent = document.getElementById("boidsCard");
    let canvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
    canvas.parent(parent);

    // Initial boid population
    for(let i=0; i<250; i++){ boids.push(new Boid(width, height)); }

}

// Main program loop
function draw() {

    // Canvas background
    background(80);

    // Updates and draws all boids (Main boid background in bottom layer, main boid in top layer)
    for (let boid of boids) {
        boid.update(boids);
        boid.display();
    }
}
