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

// class Bullet {
//     constructor(x, y, angle, range, pWidth) {
//         if (Math.sign(this.angle) == -1) {
//             this.angle = this.angle + 360
//         }
//         this.dX = Math.cos(degToRad(angle))
//         this.dY = Math.sin(degToRad(angle))
//         this.x = x + (this.dX * pWidth);
//         this.y = y + (this.dY * pWidth);
//         this.range = range;
//         this.r = pWidth / 3;
//         //this.dmg = players[myId]
//         this.id = myId;
//     }
//     move() {
//         // if(this.range > 0){
//             //this.range--
//             this.x += this.dX;
//             this.y += this.dY;
//         // }
//     }
//     draw() {
//         context.save(); //ОК???? Добавих тези 2 реда код и почна да се рисува правилно играча. 
//         context.fillStyle = "white";
//         context.strokeStyle = "black";
//         context.beginPath();
//         context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
//         context.closePath();
//         context.fill();
//         context.stroke();
//         context.restore(); //ОК???? Добавих тези 2 реда код и почна да се рисува правилно играча. 
//     }
// }

class Bullet {
    constructor(x, y, angle, pWidth){
        if( Math.sign(angle) == -1) angle += 360;
        this.dX = Math.cos(degToRad(angle));
        this.dY = Math.sin(degToRad(angle));
        this.x = x + (this.dX * pWidth);
        this.y = y + (this.dY * pWidth);
        this.r = pWidth / 3;
    }
    move() {
        this.x += this.dX;
        this.y += this.dY;
    }
    draw() {
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

class Player {
    constructor(x, y, width, id, color) {
        this.angle = 0;
        this.width = width;
        this.height = 35;
        this.id = id;
        this.color = color
        this.pos = { x: x, y: y };
        this.firerate = { regularCooldown: 50, currentCooldown: 0 };
        this.range = 100;
        this.bullets = [];
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
        let newBullet = new Bullet(this.pos.x, this.pos.y, this.angle, this.width)
        //this.bullets.push(newBullet);
        socket.emit('ejaculate', newBullet)
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
players = [];
socket.on('receiveId', function (_id) {
    myId = _id
})
socket.on('receivePlayers', function (playersObj) {
    console.log("Received ", playersObj)
    for (let i = 0; i < playersObj.length; i++) {
        players[playersObj[i].id] = new Player(playersObj[i].x, playersObj[i].y, 50, playersObj[i].id, playersObj[i].color);
    }

})

socket.on('move', function (id, x, y) {
    players[id].pos.x = x;
    players[id].pos.y = y;
})
socket.on('aim', function (id, angle) {
    players[id].angle = angle;
})

socket.on('ejaculate', function(id_, newBullet_) {
    if(players[id_].bullets == undefined) players[id_].bullets = [];
    players[id_].bullets.push(newBullet_);
})

socket.on('bulletMove', function(id, bulletIndex, dX, dY) {
    if(players[id].bullets[bulletIndex] != undefined){
        players[id].bullets[bulletIndex].x = dX;
        players[id].bullets[bulletIndex].y = dY;
    }
})

function update() {
    if (myId != undefined) {
        players[myId].move();
        players[myId].aim();
        socket.emit('aim', players[myId].angle);
        socket.emit('move', players[myId].pos.x, players[myId].pos.y);
        for(let i = 0; i < players[myId].bullets.length; i ++){
            players[myId].bullets[i].x += players[myId].bullets[i].dX;
            players[myId].bullets[i].y += players[myId].bullets[i].dY;
            socket.emit('bulletMove', i, players[myId].bullets[i].x, players[myId].bullets[i].y);
        }
    }
}

function draw() {
    for (let i = 0; i < players.length; i++) {
        for(let j = 0; j < players[i].bullets.length; j++){
            context.fillStyle = 'white';
            context.strokeStyle = 'black';
            context.beginPath();
            context.arc(players[i].bullets[j].x, players[i].bullets[j].y, players[i].bullets[j].r, 0, Math.PI*2);
            context.closePath();
            context.fill();
            context.stroke();
        }
        players[i].draw()
    }
}    
