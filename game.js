class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Bullet {
    constructor(x, y, dX, dY, r){
        this.x = x;
        this.y = y;
        this.dX = dX;
        this.dY = dY;
        this.r = r;
    }

    move() {
        this.x += this.dX;
        this.y += this.dY;
    }

    draw() {
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

let player = {
    rotation: 90,
    duljina: 120,
    color: getRandomColor(), // rotation of the player in the range between 45 and 135 degrees. defaults to 90 when facing right;
    p1: new Point(35, 285),
    p2: new Point(35, 320),
    p3: new Point(155, 285),
    p4: new Point(155, 320),
    p5: new Point(35, 303),
    draw: function(){
        context.fillStyle = this.color;
        context.save();
        context.translate(this.p5.x, this.p5.y);
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
        let newBullet = new Bullet();
        bullets.push(newBullet);
    }
}

let bullets = [];
function update() {
    for ( let i = 0; i < bullets.length ; i ++){
        bullets.move();
    }
   // console.log(dist(player.p1.x, player.p1.y, player.p3.x, player.p3.y));
}

function draw() {
    player.draw();
    for ( let i = 0; i < bullets.length ; i ++){
        bullets.draw();
    }
}

function keyup(key) {
    console.log("Pressed", key);
}

function mousemove(){
     player.aim();

}

function mouseup() {
    console.log("Mouse clicked at", mouseX, mouseY);
}
