// Recreate Asteroids
// https://www.youtube.com/watch?v=WYSupJ5r2zo

// If at any point you get stuck, you can see a working solution at
//   https://codepen.io/chesshacker/pen/NaGKqV

const ship = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  heading: -90
};

function drawShip() {
  push();
  translate(ship.x, ship.y);
  rotate(ship.heading);

  // Step 1: Draw your ship.
  // https://p5js.org/reference/#/p5/beginShape

  // Hint:
  //   the front of the ship points along the X-axis
  //   the center of your ship should be at 0, 0
  //   for a simple triangle, you could start with these vertices:
  //     (10, 0), (-10, 10), (-10, -10)

  beginShape();
  vertex(10, 0);
  vertex(-10, 10);
  vertex(-5, 0);
  vertex(-10, -10);
  endShape(CLOSE);

  pop();
}

function checkInput() {
  let turn = 0; // set to -1 when turning left and 1 when turning right
  let accelerate = false; // set to true when accelerating
  let fire = false;

  // Step 2: Check to see if any of the arrow keys are down to set the turn and
  // accelerate variables
  // https://p5js.org/reference/#/p5/keyIsDown

  // Hint: start by setting turn = -1 when LEFT_ARROW is down

  if (keyIsDown(UP_ARROW)) {
    accelerate = true;
  }
  if (keyIsDown(LEFT_ARROW)) {
    turn = -1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    turn = 1;
  }
  if (keyIsDown(32)) {
    fire = true;
  }

  updateShip(turn, accelerate);
  updateWeapons(fire);
}

const TURN_SPEED = 3.0;
const ACCELERATION = 0.1;
const MAX_SPEED = 5.0;

// Step 3: Do these constants seem right to you?
// Adjust the above constants until it feels right when you fly

// Hint: it turns too fast, accelerates too slowly and the max
//   speed is too fast.

function updateShip(turn, accelerate) {
  ship.heading += turn * TURN_SPEED;
  ship.x += ship.vx;
  ship.y += ship.vy;
  if (accelerate) {
    ship.vx += cos(ship.heading) * ACCELERATION;
    ship.vy += sin(ship.heading) * ACCELERATION;
    const speed = sqrt(sq(ship.vx) + sq(ship.vy));
    if (speed > MAX_SPEED) {
      ship.vx *= MAX_SPEED / speed;
      ship.vy *= MAX_SPEED / speed;
    }
  }
  wrap(ship);
}

function wrap(object) {

  if (object.y < 0) {
    object.y += windowHeight;
  }
  if (object.y > windowHeight) {
    object.y -= windowHeight;
  }

  // Step 4: Great Scott! Why does the ship only wrap around the top and bottom
  // edges? It looks like our programmers forgot to test the other sides of the
  // screen. Can you fix this so our space ship can wrap around all the edges?

  // Hint:
  //   top of the screen is y = 0
  //   bottom of the screen is y = windowHeight
  //   left edge of the screen is x = 0
  //   right edge of the screen is x = windowWidth
  //   use the code snipped above as your guide to
  //     inspect and possibly change object.x

  if (object.x < 0) {
    object.x += windowWidth;
  }
  if (object.x > windowWidth) {
    object.x -= windowWidth;
  }

}

// CONGRATULATIONS!
// You have completed the final challenge.
// No need to read any further.

function draw() {
  clear();
  background(0); // black
  stroke(255);  // white
  noFill();

  checkInput();
  drawShip();
  drawWeapons();
}

function centerShip() {
  ship.x = windowWidth/2;
  ship.y = windowHeight/2;
}

function setup() {
  angleMode(DEGREES);
  centerShip();
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Why are you are still reading???
// We said you were done!

// Oh... you want to make your ship fire its weapon?
// Take what you've learned here and give it a try.

// Hint: you may want to create an array of bullets
//   see https://www.w3schools.com/js/js_arrays.asp

const weapons = {
  chargeTime: 0, // 0 is ready to fire
  bullets: []
};

const BULLET_RADIUS = 5;

function drawWeapons() {
  weapons.bullets.forEach((bullet) => {
    push();
    translate(bullet.x, bullet.y);
    ellipse(0, 0, BULLET_RADIUS, BULLET_RADIUS);
    pop();
  });
}

const BULLET_SPEED = 7.0;
const CHARGE_TIME_PER_SHOT = 20;

function updateWeapons(fire) {
  if (fire && weapons.chargeTime <= 0) {
    // fire weapon
    const cosHeading = cos(ship.heading);
    const sinHeading = sin(ship.heading);
    const newBullet = {
      x: ship.x + cosHeading * 10,
      y: ship.y + sinHeading * 10,
      vx: cosHeading * BULLET_SPEED,
      vy: sinHeading * BULLET_SPEED
    };
    weapons.bullets.push(newBullet);
    weapons.chargeTime = CHARGE_TIME_PER_SHOT;
  } else if (weapons.chargeTime > 0) {
    // decrease weapon chargeTime until it is 0
    weapons.chargeTime--;
  }

  // advance bullets
  weapons.bullets.forEach((bullet) => {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  });

  // keep only those bullets that are still in view
  weapons.bullets = weapons.bullets.filter(b => b.x >= 0 && b.y <= windowWidth && b.y >= 0 && b.y <= windowHeight);
}
