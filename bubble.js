var pressedX;
var pressedY;
var flag = false;
var env = new TheEnv(50, 500, 500, 50, 1, 1);

function setup() {
    createCanvas(screen.width, screen.height);
}

function Bubble(info) {
    this.radius = info.radius;
    this.x = info.x;
    this.y = info.y;
    this.color = info.color;
    this.Vx = info.Vx;
    this.Vy = info.Vy;
    this.Ax = info.Ax;
    this.Ay = info.Ay;
    this.mass = info.mass;
    this.move = function() {
        this.Vx += this.Ax;
        this.Vy += this.Ay;
        this.x += this.Vx;
        this.y += this.Vy;
        if (this.x + this.radius/2 > env.right) {
            this.Vx *= -1;
        }
        if (this.y + this.radius/2 > env.bottom) {
            this.Vy *= -1;
        }
        if (this.x - this.radius/2 < env.left) {
            this.Vx *= -1;
        }
        if (this.y - this.radius/2 < env.top) {
            this.Vy *= -1;
        }
    };
}

function draw() {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(5);
    rect(env.left, env.bottom, env.right-env.left, env.top-env.bottom);
    for (var i = 0; i < env.bubbles.length; i++) {
        noStroke();
        env.bubbles[i].move();
        fill(env.bubbles[i].color[0],env.bubbles[i].color[1],env.bubbles[i].color[2]);
        ellipse(env.bubbles[i].x, env.bubbles[i].y, env.bubbles[i].radius, env.bubbles[i].radius);
    }
}

// function mouseClicked() {
//     bubbles.push(new Bubble(mouseX, mouseY, "#ff0000", 10, 10));
// }

function mousePressed() {
    pressedX = mouseX;
    pressedY = mouseY;
    if (env.left > pressedX || pressedX > env.right || env.bottom < pressedY || pressedY < env.top) {
        flag = false;
    }
    else {
        flag = true;
    }
}

function random(start,stop){
    return Math.floor(Math.random()*(stop-start)+start);
}

function mouseReleased() {
    var mass = random(100,255);
    var info = {};
    info.radius = 70;
    info.x = pressedX;
    info.y = pressedY;
    info.color = [mass,50,50];
    info.Vx = (mouseX - pressedX)/5;
    info.Vy = (mouseY - pressedY)/5;
    info.mass = mass;
    if (flag == true){
        env.addBubble(info);
    }
}

function TheEnv(top, right, bottom, left, Ax, Ay) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.bubbles = new Array();
    this.Ax = Ax;
    this.Ay = Ay;
    this.addBubble = function (info) {
        info.Ax = this.Ax;
        info.Ay = this.Ay;
        this.bubbles.push(new Bubble(info));
    };
}