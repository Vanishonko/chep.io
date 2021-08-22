function degToRad(angle) {
    return angle * Math.PI / 180
}
function drawDick(x, y, width, height) {
    context.fillRect(0, -(height / 2), width, height);
    context.beginPath();
    context.arc(0, height / 2, height / 2, 0, Math.PI * 2);
    context.arc(0, - height / 2, height / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

class Player {
    constructor(x, y, width, id,color) {
        this.angle = 0;
        this.width = width;
        this.height = 35;
        this.id = id;
        this.color = color
        this.pos = { x: x, y: y };
        this.firerate = { regularCooldown: 50, currentCooldown: 0 };
    }
    draw() {
        context.save();
        context.fillStyle = this.color;
        context.translate(this.pos.x, this.pos.y);
        context.rotate(degToRad(this.angle));
        drawDick(this.pos.x, this.pos.y, this.width, this.height);
        context.restore();
    }
    aim() {
        let dX = mouseX - this.pos.x;
        let dY = mouseY - this.pos.y;
        this.angle = Math.atan2(dY, dX) * 180 / Math.PI;
        //Следващото парче код ще превръща -90 до -270 в правилния ъгъл(-40 - 320)
        if (Math.sign(this.angle) == -1) {
            this.angle = this.angle + 360;
        }
    }
    ejaculate() {
        this.firerate.currentCooldown = this.firerate.regularCooldown;
        bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle))
    }
    move() {
        this.firerate.currentCooldown--;
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
        if (isKeyPressed[32] && this.firerate.currentCooldown <= 0) {
            this.ejaculate();
        }
    }
}
let socket = io()
let myId = undefined;
players = []
socket.on('receiveId', function (_id) {
    myId = _id
})
socket.on('receivePlayers', function (playersObj) {
    console.log("Received ", playersObj)
    for (let i = 0; i < playersObj.length; i++) {
        players[playersObj[i].id] = new Player(playersObj[i].x, playersObj[i].y, 50, playersObj[i].id,playersObj[i].color)
    }

})
socket.on('move', function (id, x, y) {
    players[id].pos.x = x;
    players[id].pos.y = y;
})
socket.on('aim', function (id, angle) {
    players[id].angle = angle;
})
function update() {
    if (myId != undefined) {
        players[myId].move()
        players[myId].aim()
        socket.emit('aim', players[myId].angle)
        socket.emit('move', players[myId].pos.x, players[myId].pos.y)
    }
}

function draw() {
    for (let i = 0; i < players.length; i++) {
        players[i].draw()
    }
}

function keyup(key) {

}
function mouseup() {

}