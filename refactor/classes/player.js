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
    constructor(x, y, width, height) {
        this.angle = 0; // Ъгъл от 0 до 360 градуса
        this.width = width; // Дължината на играча
        this.height = height; // Дебелината на играча
        this.pos = { x: x, y: y };//Има ли смисъл да държим координатите в един обект?
        this.firerate = { regularCooldown: 50, currentCooldown: 0 };
    }
    draw() {
        context.save();
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
        bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle, bullets.length))
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
    collision() {
        for (let i = 0; i < eggcells.length; i++){
            
        }
    }
}