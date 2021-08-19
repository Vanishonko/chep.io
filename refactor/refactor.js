function degToRad(angle) {
    return angle * Math.PI / 180
}
function drawDick(x, y, width) {
    context.fillRect(0, -(35 / 2), width, 35);
    context.beginPath();
    context.arc(0, 35 / 2, 20, 0, Math.PI * 2);
    context.arc(0, 0 - 35 / 2, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}
class Player {
    constructor(x, y, width) {
        this.angle = 0;
        this.width = width;
        this.pos = { x: x, y: y };
    }
    draw() {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.rotate(degToRad(this.angle - 90));
        drawDick(this.pos.x, this.pos.y, this.width)
        context.restore();
    }
    aim() {
        let dX = mouseX - this.pos.x;
        let dY = mouseY - this.pos.y;
        this.angle = Math.atan2(dY, dX) * 180 / Math.PI;
        this.angle += 90; // Това го добавяме за да сочи към мишката иначе е прецакано
        //Следващото парче код ще превръща -90 до -270 в правилния ъгъл(-40 - 320)
        if (Math.sign(this.angle) == -1) {
            this.angle = this.angle + 360
        }
    }
    shoot() {
        console.log(this.angle)
        bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle))
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

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.dX = Math.cos(degToRad(angle-90))
        this.dY = Math.sin(degToRad(angle-90))
    }
    move() {
        this.x += this.dX
        this.y += this.dY
    }
    draw() {
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

let player = new Player(100, 100, 50)
let bullets = [];
function update() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].move();
    }
    player.controll()
    player.aim();
}

function draw() {
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
    player.draw();
}

function keyup(key) {
    if (key == 32) {
        player.shoot()
    }
}

function mousemove() {

}
