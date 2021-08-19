let player = new Player(100, 100, 50)
let bullets = [];

function update() {
    for (let i = 0; i < bullets.length; i++) bullets[i].move();
    player.controll()
    player.aim();
}

function draw() {
    player.draw();
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
}

function keyup(key) {
    if (key == 32) {
        player.shoot()
    }
}

function mousemove() {

}
