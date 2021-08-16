class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
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
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.lineTo(this.p4.x, this.p4.y);
        context.lineTo(this.p3.x, this.p3.y);
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
        let dX = mouseX - 35;
        let dY = mouseY - 303;
        this.rotation = Math.round( (Math.atan2(dY, dX) ) * 180 / Math.PI );
        this.rotation += 90;
        if(this.rotation < 0){
            this.rotation += 360;
        }
        if(this.rotation < 45){
            this.rotation = 45;
        }
        if(this.rotation > 135){
            this.rotation = 135;
        }
        console.log(this.rotation)

        this.p3 = rotate(this.p5, this.p3, this.rotation);
        this.p4 = rotate(this.p5, this.p4, this.rotation);
    
    },
    shoot: function(){

    }
}

function update() {
   // console.log(dist(player.p1.x, player.p1.y, player.p3.x, player.p3.y));
}

function draw() {
    player.draw();
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
