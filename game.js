class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}


// 1. Suzdavame promenlivi
let player = {
    rotation: 90,
    duljina: 120,
    color: getRandomColor(), // rotation of the player in the range between 45 and 135 degrees. defaults to 90 when facing right;
    p1: new Point(35, 285),
    p2: new Point(35, 320),
    p3: new Point(35, 285),
    p4: new Point(35, 320),
    draw: function(){
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.lineTo(this.p4.x + this.duljina, this.p4.y);
        context.lineTo(this.p3.x + this.duljina, this.p3.y);
        context.lineTo(this.p1.x, this.p1.y);
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(35, 285, 20, 0, Math.PI*2);
        context.arc(35, 320, 20, 0, Math.PI*2);
        context.closePath();
        context.fill();
    },
    aim: function(){
        let dX = 35 - mouseX;
        let dY = 303 - mouseY;
        let length = Math.hypot(dX, dY);
        if (length > 0){
            dX /= length;
            dY /= length;
        }
        this.rotation = Math.atan2(dX, dY) + 90*Math.PI/180;

        this.p3.x = rotate(35, 303, this.p3.x + this.duljina, this.p3.y, this.rotation)[0];
        this.p3.y = -rotate(35, 303, this.p3.x + this.duljina, this.p3.y, this.rotation)[1];
        this.p4.x = rotate(35, 303, this.p4.x + this.duljina, this.p4.y, this.rotation)[0];
        this.p4.y = -rotate(35, 303, this.p4.x + this.duljina, this.p4.y, this.rotation)[1];
    },
    shoot: function(){

    }
}

function update() {
    // 2. Kodut tuk se izpulnqva 100
}

function draw() {
    player.draw();
}

function keyup(key) {
    // Pechatai koda na natisnatiq klavish
    console.log("Pressed", key);
}

function mousemove(){
    player.aim();
}

function mouseup() {
    // Pri klik - pokaji koordinatite na mishkata
    console.log("Mouse clicked at", mouseX, mouseY);
}
