var pressedX;
var pressedY;

function setup() {
    createCanvas(screen.width, screen.height);
}

function Bubble(x, y, color, Vx, Vy, mass) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.Vx = Vx;
    this.Vy = Vy;
    this.Ax = 0;
    this.Ay = 0;
    this.mass = mass;
    this.move = function() {
        this.x += this.Vx;
        this.y += this.Vy;
        if (this.x > width) {
            this.Vx *= -1;
        }
        if (this.y > height) {
            this.Vy *= -1;
        }
        if (this.x < 0) {
            this.Vx *= -1;
        }
        if (this.y < 0) {
            this.Vy *= -1;
        }
    };
}

bubbles = new Array();

function draw() {
    background(0);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        fill(bubbles[i].color[0],bubbles[i].color[1],bubbles[i].color[2]);
        ellipse(bubbles[i].x, bubbles[i].y, 30, 30);
    }
}

// function mouseClicked() {
//     bubbles.push(new Bubble(mouseX, mouseY, "#ff0000", 10, 10));
// }

function mousePressed() {
    pressedX = mouseX;
    pressedY = mouseY;
}

function random(start,stop){
    return Math.floor(Math.random()*(stop-start)+start);
}

function mouseReleased() {
    var mass = random(100,255);
    bubbles.push(new Bubble(pressedX, pressedY,[mass,50,50], (mouseX - pressedX)/5, (mouseY - pressedY)/5, mass));
}