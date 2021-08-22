let player = new Player(100, 100, 10, 10);
let bullets = [];
let eggcells = []
for (let i = 0; i < 10; i++) {
    eggcells.push(new Eggcell(randomInteger(300), randomInteger(300)))
}
function update() {
    for (let i = 0; i < bullets.length; i++){
        bullets[i].move();
        bullets[i].collision();
    } 
    player.move()
    player.aim()

}

function draw() {
    for (let i = 0; i < eggcells.length; i++) eggcells[i].draw();
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
    player.draw()

}

function keyup(key) {
}

function mousemove() {

}
