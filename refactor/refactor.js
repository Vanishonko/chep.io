let players = []
players.push(new Player(100, 100, 50));
let bullets = [];

function update() {
    for (let i = 0; i < bullets.length; i++) bullets[i].move();
    for (let i = 0; i < players.length; i++) {
        players[i].move()
        players[i].aim()
    }
}

function draw() {
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
    for (let i = 0; i < players.length; i++) players[i].draw();
}

function keyup(key) {
}

function mousemove() {

}
