function degToRad(angle) {
    return angle * Math.PI / 180
}
function drawDick(x, y, width) {
    context.fillRect(0, - 18, width, 35);
    context.beginPath();
    context.arc(0, -18, 20, 0, Math.PI * 2);
    context.arc(0, 17, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}
class Player {
    constructor(x, y, width) {
        this.rotation = 90;
        this.width = width;
        this.pos = { x: x, y: y };
    }
    draw() {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.rotate(degToRad(this.rotation - 90));
        drawDick(this.pos.x, this.pos.y, this.width)
        context.restore();
    }
    aim() {
        let dX = mouseX - this.pos.x;
        let dY = mouseY - this.pos.y;
        this.rotation = Math.round((Math.atan2(dY, dX)) * 180 / Math.PI);
        this.rotation += 90; // Това го добавяме за да сочи към мишката иначе е прецакано
    }
    controll() {
        if (isKeyPressed[65]) {
            this.pos.x -= 5;
        }
        if (isKeyPressed[68]) {
            this.pos.x += 5;
        }
        if (isKeyPressed[87]) {
            this.pos.y -= 5;
        }
        if (isKeyPressed[83]) {
            this.pos.y += 5;
        }
    }
}
let player = new Player(100, 100, 50)

function update() {
    player.aim();
}

function draw() {
    player.draw();
    player.controll()
}

function keyup(key) {

}

function mousemove() {

}
