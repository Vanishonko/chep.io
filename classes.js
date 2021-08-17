class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Eggcell {
    constructor(){
        this.x = 900 + Math.floor(Math.random()*300);
        this.y = Math.floor(Math.random()*1000) - 400;
        this.dX = 35 - this.x;
        this.dY = 303 - this.y;
        this.offScreen = false;
        let length = Math.hypot(this.dX, this.dY);
        if(length > 0){
            this.dX /= length;
            this.dY /= length;
        }
        this.r = Math.floor(Math.random()*100) + 30;
        this.hp = this.r;
        this.speed = 5 - this.r/100*5;
        this.color = getRandomColor();
    }
    move(){
        this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;
        if(this.x < - 200) this.offScreen = true;
    }
    draw(){
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.closePath();
        context.fill();
        context.fillStyle = "gray";
        context.fillRect(this.x - this.r, this.y - this.r - 14, this.r*2, 12)
        context.fillStyle = this.color;
        context.fillRect(this.x - this.r + 2, this.y - this.r - 12, this.hp*2 - 4, 8);
    }
}

class Bullet {
    constructor(point, dir, r){
        this.x = point.x;
        this.y = point.y;
        this.r = r;
        this.speed = 2;
        this.dX = mouseX - 35;
        this.dY = mouseY - 303;
        this.offScreen = false;
        this.dmg = 40;
        let length = Math.hypot(this.dX, this.dY);
        if(length > 0) {
            this.dX /= length;
            this.dY /= length;
        }
        if(this.dX < 0) this.dX = 0;
    }   

    move() {
        this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;
        if(this.x > 1000 || this.y < -200 || this.y > 800) {
            this.offScreen = true;
        }
    }

    draw() {
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.closePath();
        context.fill();
        context.stroke();
    }
}
