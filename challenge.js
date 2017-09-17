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

  pop();
}

function checkInput() {
  let turn = 0; // set to -1 when turning left and 1 when turning right
  let accelerate = false; // set to true when accelerating

  // Step 2: Check to see if any of the arrow keys are down to set the turn and
  // accelerate variables
  // https://p5js.org/reference/#/p5/keyIsDown

  // Hint: start by setting turn = -1 when LEFT_ARROW is down

  updateShip(turn, accelerate);
}

const TURN_SPEED = 8.0;
const ACCELERATION = 0.01;
const MAX_SPEED = 50.0;

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
