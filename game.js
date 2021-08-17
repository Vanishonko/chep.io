class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Eggcell {
    constructor() {
        this.x = 900 + Math.floor(Math.random() * 300);
        this.y = Math.floor(Math.random() * 1000) - 400;
        this.dX = 35 - this.x;
        this.dY = 303 - this.y;
        this.offScreen = false;
        let length = Math.hypot(this.dX, this.dY);
        if (length > 0) {
            this.dX /= length;
            this.dY /= length;
        }
        this.r = Math.floor(Math.random() * 100) + 30;
        this.hp = this.r;
        this.speed = 5 - this.r / 100 * 5;
        this.color = getRandomColor();
    }
    move() {
        this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;
        if (this.x < - 200) this.offScreen = true;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.fillStyle = "gray";
        context.fillRect(this.x - this.r, this.y - this.r - 14, this.r * 2, 12)
        context.fillStyle = this.color;
        context.fillRect(this.x - this.r + 2, this.y - this.r - 12, this.hp * 2 - 4, 8);
    }
}

class Bullet {
    constructor(point, dir, r) {
        this.x = point.x;
        this.y = point.y;
        this.r = r;
        this.speed = 2;
        this.dX = mouseX - 35;
        this.dY = mouseY - 303;
        this.offScreen = false;
        this.dmg = 40;
        let length = Math.hypot(this.dX, this.dY);
        if (length > 0) {
            this.dX /= length;
            this.dY /= length;
        }
        if (this.dX < 0) this.dX = 0;
    }

    move() {
        this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;
        if (this.x > 1000 || this.y < -200 || this.y > 800) {
            this.offScreen = true;
        }
    }

    draw() {
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}

let player = {
    rotation: 90,
    duljina: 120,
    color: getRandomColor(), // rotation of the player in the range between 45 and 135 degrees. defaults to 90 when facing right;
    p1: new Point(35, 303),
    draw: function () {
        context.fillStyle = this.color;
        context.save();
        context.translate(this.p1.x, this.p1.y);
        context.rotate(degToRad(this.rotation - 90));
        context.fillRect(0, -18, this.duljina, 35);
        context.restore();
        context.beginPath();
        context.arc(this.p1.x, this.p1.y - 18, 20, 0, Math.PI * 2);
        context.arc(this.p1.x, this.p1.y + 17, 20, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    },
    aim: function () {
        let dX = mouseX - 35;
        let dY = mouseY - 303;
        this.rotation = Math.round((Math.atan2(dY, dX)) * 180 / Math.PI);
        this.rotation += 90;
        if (this.rotation < 0) {
            this.rotation += 360;
        }
        if (this.rotation < 45 || (mouseY < 303 && this.rotation > 135)) {
            this.rotation = 45;
        }
        if (this.rotation > 135) {
            this.rotation = 135;
        }
    },
    ejaculate: function () {
        let shootPoint;
        let oldP = new Point((this.p1.x + this.duljina), this.p1.y);
        shootPoint = rotate(this.p1, oldP, degToRad(this.rotation - 90));
        let newBullet = new Bullet(shootPoint, this.rotation, 10);
        bullets.push(newBullet);
    },
    controll: function () {
        if (isKeyPressed[65]) {
            this.p1.x -= 5;
        }
        if (isKeyPressed[68]) {
            this.p1.x += 5;
        }
        if (isKeyPressed[87]) {
            this.p1.y -= 5;
        }
        if (isKeyPressed[83]) {
            this.p1.y += 5;
        }
        if (isKeyPressed[32]) {
            player.ejaculate();
        }
    }
}

let bullets = [], enemies = [], level = 0.975;
function update() {

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].move();
        if (bullets[i].offScreen) bullets.splice(i, 1);
    }
    if (Math.random() > level) enemies.push(new Eggcell());
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].move();
        if (enemies[i].offScreen) enemies.splice(i, 1);
        for (let j = 0; j < bullets.length; j++) {
            if (dist(bullets[j].x, bullets[j].y, enemies[i].x, enemies[i].y) <= enemies[i].r + bullets[j].r) {
                enemies[i].hp -= bullets[j].dmg;
                bullets.splice(j, 1);
                player.bullets--;
                if (enemies[i].hp <= 0) enemies.splice(i, 1);
            }
        }
    }
}

function draw() {
    for (let i = 0; i < enemies.length; i++) enemies[i].draw();
    for (let i = 0; i < bullets.length; i++) bullets[i].draw();
    player.draw();
    player.controll()
}

function keyup(key) {

    console.log(key)
}

function mousemove() {
    player.aim();
}

function mouseup() {
    // console.log("Mouse clicked at", mouseX, mouseY);
}
