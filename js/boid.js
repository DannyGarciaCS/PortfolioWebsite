
class Boid {

    // Object constructor
    constructor(width, height) {

        this.width = width;
        this.height = height;

        this.forces = [3.2, 3.2, 3.4];
        this.speed = height * 0.006;
        this.torque = 0.07;
        this.sightDistance = height * 0.15;

        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.rotation = 0;
    }

    // Warps boids across the screen if out of bounds
    warp() {

        // Boid has left the x-axis
        if(this.position.x > this.width) { this.position.x = 0; }
        else if(this.position.x < 0) { this.position.x = this.width; }

        // Boid has left the y-axis
        if(this.position.y > this.height) { this.position.y = 0; }
        else if(this.position.y < 0) { this.position.y = this.height; }
    }

    // Applies basic motion rules
    applyRules(boids) {

        // Initializes computation variables (alignment, cohesion, separation)
        let directions = [createVector(), createVector(), createVector()];
        let count = 0;

        for(let boid of boids) {

            // We are not comparing to self
            if(boid != this) {

                // Determines distance between boids
                let distance = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);

                // Distance is within sightDistance
                if(distance <= this.sightDistance) {
                    directions[0].add(boid.velocity);
                    directions[1].add(boid.position);
                    directions[2].add(p5.Vector.sub(this.position, boid.position).div(distance * distance));
                    count += 1;

                    // Highlights visible boids if current is primary and limits comparisons for performance
                    if(this.primary && this.highlight) { boid.secondary = true; }
                    if(!this.accurate && count > 8) { break; }
                }
            }
        }

        // Applies directional changes
        if(count > 0) {

            // Averages directions
            for(let direction of directions) { direction.div(count); }
            directions[1].sub(this.position);

            // Changes acceleration
            for(let direction in directions) {
                directions[direction].setMag(this.speed);
                directions[direction].sub(this.velocity);
                directions[direction].limit(this.torque);
                this.acceleration.add(directions[direction].mult(this.forces[direction]));
            }
        }
    }

    // Updates status of boid
    update(boids) {

        // Warps boids across the screen
        this.warp();

        // Reset acceleration and recalculate based on Boid rules
        this.acceleration.mult(0);
        this.applyRules(boids);

        // Update boid's position and velocity
        this.position.add(this.velocity);
        this.rotation = Math.atan2(-this.velocity.x, -this.velocity.y) / (PI / 180);
        this.velocity.add(this.acceleration);

    }

    // Displays current status of boid
    display() {

        // Visual settings
        stroke(255);
        fill('rgba(255, 255, 255, 0.2)');

        // Boid size
        let height;
        let width;
        if(window.innerWidth > window.innerHeight) {
            height = window.innerHeight / 150;
            width = window.innerHeight / 250;
            strokeWeight(window.innerHeight / 900);
        } else {
            height = window.innerWidth / 125;
            width = window.innerWidth / 200;
            strokeWeight(window.innerWidth / 800);
        }

        // Boid position
        let p1 = this.axisRotation(this.position.x, this.position.y, this.position.x, this.position.y - height, this.rotation);
        let p2 = this.axisRotation(this.position.x, this.position.y, this.position.x + width, this.position.y + height, this.rotation);
        let p3 = this.axisRotation(this.position.x, this.position.y, this.position.x - width, this.position.y + height, this.rotation);
        let p4 = this.axisRotation(this.position.x, this.position.y, this.position.x, this.position.y - height * 3.5, this.rotation);

        // Draws boid
        triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        line(p1.x, p1.y, p4.x, p4.y);
    }

    // Rotates a point across a given axis
    axisRotation(axisX, axisY, x, y, angle) {
        const radians = this.degToRad(angle)
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let finalX = (cos * (x - axisX)) + (sin * (y - axisY)) + axisX;
        let finalY = (cos * (y - axisY)) - (sin * (x - axisX)) + axisY;
        return createVector(finalX, finalY);
    }

    // Conversion functions
    degToRad(angle) { return (PI / 180) * angle }
    radToDeg(angle) { return angle * (180 / Math.PI) }
}