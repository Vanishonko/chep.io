class Eggcell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 1;
    }
    draw() {
        context.save()
        switch (this.state) {
            case 1:
                context.fillStyle = 'pink'
                break;
            case 2:
                context.fillStyle = 'violet'
                break;
            case 3:
                context.fillStyle = 'purple'
                break;
        }
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(this.x, this.y, this.state * 5, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore()
    }
}