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

function drawBullet(b_){
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.beginPath();
    context.arc(b_.x, b_.y, b_.r, 0, Math.PI*2);
    context.closePath();
    context.globalAlpha = (b_.range / 100);
    context.fill();
    context.stroke();
    context.globalAlpha = 1;
}

function moveBullet(b_){
    if(b_.range > 0){
        b_.x += b_.dX * b_.speed;
        b_.y += b_.dY* b_.speed;
        b_.range--;
        // console.log(b_.range)
    } else {
        b_.selfDestruct = true;
    }
}

function drawObj(x, y, sX, sY, col, text){
    context.fillStyle = col;
    context.fillRect(x, y, sX, sY);
    let fontSize = sY/3*2 ;
    context.font = fontSize + "px courier new";
    context.fillStyle = "black";
    context.fillText(text, x, y + fontSize)
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
    constructor(x, y, angle, pWidth, speed, range, dmg){
        if( Math.sign(angle) == -1) angle += 360;
        this.dX = Math.cos(degToRad(angle));
        this.dY = Math.sin(degToRad(angle));
        this.x = x + (this.dX * pWidth);
        this.y = y + (this.dY * pWidth);
        this.range = range;
        this.r = pWidth / 3;
        this.speed = speed;
        this.dmg = dmg;
        this.selfDestruct = false;
    }
    move() {
        if(this.range > 0){
            this.range --;
            this.x += this.dX * this.speed;
            this.y += this.dY * this.speed;
        } else { this.selfDestruct = true; }
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
        this.movementSpeed = 2;
        this.firerate = { regularCooldown: 50, currentCooldown: 0 };
        this.range = 240;
        this.bullets = [];
        this.bulletSpeed = 1.5;
        this.dmg = 10;
        this.hp = 800;
        // if(xp == undefined) {
            this.xp = { current: 0, nextThreshold: 200, level: 1, levelsToAdd: 0};
        // else{
            // this.xp = xp;
        // }
        // if(upgrades == undefined){
            this.upgrades = [
                { name: "Health", level: 0, color: "#53d08d"}, //hp
                { name: "Healing", level: 0, color: "lightgreen"},//hp reg
                { name: "Agility", level: 0, color: "lightblue"},//mov speed
                { name: "Bullet speed", level: 0, color: "yellow"},//bullet speed
                { name: "Damage", level: 0, color: "red"}, //dmg
                { name: "Range", level: 0, color: "beige"}, //range
                { name: "Firerate", level: 0, color: "purple"}//firerate
            ];
        // } else {
            // this.upgrades = upgrades;
        // }
    }
    update(){
        this.aim();
        this.move();

        this.xp.current += 0.005;
        if(this.xp.current >= this.xp.nextThreshold){
            this.xp.level ++;
            this.xp.current -= this.xp.nextThreshold;
            this.xp.nextThreshold += (this.xp.level - 1) * 50;
            this.xp.levelsToAdd++
        }
    }
    draw() {
        context.save();
        context.fillStyle = this.color;
        context.translate(this.pos.x, this.pos.y);
        context.rotate(degToRad(this.angle));
        drawDick(this.pos.x, this.pos.y, this.width, this.height);
        context.restore();
    }
    drawUI(){
        context.fillStyle = "#333333";
        context.fillRect(200, 550, 500, 10);
        context.fillStyle = "yellow";
        context.fillRect(202, 552, Math.floor(this.xp.current)/this.xp.nextThreshold*496, 6);
        context.font = "20px courier new";
        context.fillStyle = "black";
        context.fillText("Level: " + this.xp.level, 200, 545);
        context.fillText("XP: " + Math.floor((this.xp.current)*10)/10 + "/" + this.xp.nextThreshold, 200, 580);

        if(this.xp.levelsToAdd > 0) {
            context.fillStyle = "black";
            context.font = "20px courier new"
            context.fillText("Upgrades: ("+this.xp.levelsToAdd+")", 20, 40);
            context.globalAlpha = 0.5;
            context.fillRect(15, 20, 350, 180)
            context.globalAlpha = 1;
            for(let i = 0; i < this.upgrades.length ; i ++) {
                let newString = "(" + (i+1) + ")" + " " + this.upgrades[i].name + " - level " + (this.upgrades[i].level+1);
                context.fillStyle = this.upgrades[i].color;
                context.fillText(newString, 20, 70 + i * 20);
            }
        }
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
        let newBullet = new Bullet(this.pos.x, this.pos.y, this.angle, this.width, this.bulletSpeed, this.range, this.dmg)
        //this.bullets.push(newBullet);
        socket.emit('ejaculate', newBullet)
    }
    move() {
        this.firerate.currentCooldown--;
        if (isKeyPressed[65]) {
            this.pos.x -= this.movementSpeed;
        }
        if (isKeyPressed[68]) {
            this.pos.x += this.movementSpeed;
        }
        if (isKeyPressed[87]) {
            this.pos.y -= this.movementSpeed;
        }
        if (isKeyPressed[83]) {
            this.pos.y += this.movementSpeed;
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
        players[playersObj[i].id] = new Player(playersObj[i].x, playersObj[i].y, 50, playersObj[i].id, playersObj[i].color, playersObj[i].xp, playersObj[i].upgrades);
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

socket.on('bulletMove', function(id, bulletIndex, dX, dY, range) {
    if(players[id].bullets[bulletIndex] != undefined){
        players[id].bullets[bulletIndex].x = dX;
        players[id].bullets[bulletIndex].y = dY;
        players[id].bullets[bulletIndex].range = range;
    }
})

socket.on('bulletSplice', function(id, i){
    players[id].bullets.splice(i, 1);
})
 
function update() {
    if (myId != undefined) {
        players[myId].update();
        socket.emit('aim', players[myId].angle);
        socket.emit('move', players[myId].pos.x, players[myId].pos.y);
        for(let i = 0; i < players[myId].bullets.length; i ++){
            moveBullet(players[myId].bullets[i]);
            socket.emit('bulletMove', i, players[myId].bullets[i].x, players[myId].bullets[i].y, players[myId].bullets[i].range);
            if(players[myId].bullets[i].selfDestruct){
                // players[myId].bullets.splice(i, 1);
                socket.emit('bulletSplice', i);
            }
        }
    }
}

function draw() {

    context.fillStyle = "lightgray"
    context.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < players.length; i++) {
        for(let j = 0; j < players[i].bullets.length; j++){
            drawBullet(players[i].bullets[j]);
        }
        players[i].draw()
    }

    if(myId != undefined) players[myId].drawUI();
}    

function keyup(key) { 
    if(players[myId].xp.levelsToAdd > 0){
        switch (key){
            case 49:
                if(players[myId].upgrades[0].level < 4){
                    players[myId].upgrades[0].level ++;
                    players[myId].hp += 200;
                    players[myId].xp.levelsToAdd--;
                    break;
                }
            case 50:
                if(players[myId].upgrades[1].level < 4){
                    players[myId].upgrades[1].level ++;
                    players[myId].xp.levelsToAdd--;
                }
                break;
            case 51:
                if(players[myId].upgrades[2].level < 4){
                    players[myId].upgrades[2].level ++;
                    players[myId].movementSpeed += 0.5;
                    players[myId].xp.levelsToAdd--;
                }
                break;
            case 52:
                if(players[myId].upgrades[3].level < 4){
                    players[myId].upgrades[3].level ++;
                    players[myId].bulletSpeed += 0.2;
                    players[myId].xp.levelsToAdd--;
                }
                break;
            case 53:
                if(players[myId].upgrades[4].level < 4){
                    players[myId].upgrades[4].level ++;
                    players[myId].dmg += 100;
                    players[myId].xp.levelsToAdd--;
                }
                break;
            case 54:
                if(players[myId].upgrades[5].level < 4){
                    players[myId].upgrades[5].level ++;
                    players[myId].range += 200;
                    players[myId].xp.levelsToAdd--;
                }
                break;
            case 55:
                if(players[myId].upgrades[6].level < 4){
                    players[myId].upgrades[6].level ++;
                    players[myId].firerate.regularCooldown -= 5;
                    players[myId].xp.levelsToAdd--;
                }
                break;
        }
    }
}
