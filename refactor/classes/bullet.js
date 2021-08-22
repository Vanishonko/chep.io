class Bullet {
    constructor(x, y, angle, i) {
        if (Math.sign(this.angle) == -1) {
            this.angle = this.angle + 360
        }
        this.i = i;
        this.dX = Math.cos(degToRad(angle))
        this.dY = Math.sin(degToRad(angle))
        this.x = x + (this.dX * player.width);
        this.y = y + (this.dY * player.width);
    }
    move() {
        this.x += this.dX
        this.y += this.dY
    }
    draw() {
        context.save(); //ОК???? Добавих тези 2 реда код и почна да се рисува правилно играча. 
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, player.height / 3, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore(); //ОК???? Добавих тези 2 реда код и почна да се рисува правилно играча. 
    }
    collision() {
        for (let i = 0; i < eggcells.length; i++) {
            let dx = eggcells[i].x - this.x;
            let dy = eggcells[i].y - this.y;
            let radius = (eggcells[i].state * 5) + (player.height / 3)
            if ((dx * dx) + (dy * dy) < radius * radius) {
                eggcells[i].state++;
                bullets.splice(this.i, 1)
            }
        }
    }
}