let player = new Player(100, 100, 50)
let bullets = [];

function update() {
    for (let i = 0; i < bullets.length; i++) bullets[i].move();
    player.move()
    player.aim();
}

function draw() {
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
    player.draw();
}

function keyup(key) {
}

function mousemove() {

}
