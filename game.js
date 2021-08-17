
let player = {
    rotation: 90,
    duljina: 120,
    color: getRandomColor(), // rotation of the player in the range between 45 and 135 degrees. defaults to 90 when facing right;
    p1: new Point(35, 303),
    draw: function(){
        context.fillStyle = this.color;
        context.save();
        context.translate(this.p1.x, this.p1.y);
        context.rotate(degToRad(this.rotation - 90));
        context.fillRect(0, -18, this.duljina, 35);
        context.restore();
        context.beginPath();
        context.arc(35, 285, 20, 0, Math.PI*2);
        context.arc(35, 320, 20, 0, Math.PI*2);
        context.closePath();
        context.fill();
    },
    aim: function(){
        let dX = mouseX - 35;
        let dY = mouseY - 303;
        this.rotation = Math.round( (Math.atan2(dY, dX) ) * 180 / Math.PI );
        this.rotation += 90;
        if(this.rotation < 0){
            this.rotation += 360;
        }
        if(this.rotation < 45 || ( mouseY < 303 && this.rotation > 135) ){
            this.rotation = 45;
        }
        if(this.rotation > 135){
            this.rotation = 135;
        }
    },
    ejaculate: function(){
        let shootPoint;
        let oldP = new Point((35 + this.duljina), 303);
        shootPoint = rotate(this.p1, oldP, degToRad(this.rotation - 90));
        let newBullet = new Bullet(shootPoint, this.rotation, 10);
        bullets.push(newBullet);
    }
}

let bullets = [], enemies = [], level = 0.975;
function update() {
    for ( let i = 0; i < bullets.length ; i ++){
        bullets[i].move();
        if(bullets[i].offScreen) bullets.splice(i, 1);
    }
    if (Math.random() > level) enemies.push(new Eggcell());
    for ( let i = 0; i < enemies.length ; i ++) {
        enemies[i].move();
        if(enemies[i].offScreen) enemies.splice(i, 1);
        for( let j = 0; j < bullets.length ; j ++){
            if(dist(bullets[j].x, bullets[j].y, enemies[i].x, enemies[i].y) <= enemies[i].r + bullets[j].r){
                enemies[i].hp -= bullets[j].dmg;
                bullets.splice(j, 1);
                if(enemies[i].hp <= 0) enemies.splice(i, 1);
            }
        }
    }

}

function draw() {
    for ( let i = 0; i < enemies.length ; i ++) enemies[i].draw();
    for ( let i = 0; i < bullets.length ; i ++) bullets[i].draw();
    player.draw();
}

function keyup(key) {
   // console.log("Pressed", key);
    player.ejaculate();
}

function mousemove(){
    player.aim();

}

function mouseup() {
   // console.log("Mouse clicked at", mouseX, mouseY);
}
