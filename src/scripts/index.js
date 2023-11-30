// Get the canvas element
let canvas = document.getElementById("canvas");
// Get the 2D rendering context for the drawing surface of the canvas
let ctx = canvas.getContext("2d");

// Initialize an empty array to hold the balls
let balls = [];
// Create the balls
for (let i = 0; i < BALL_COUNT; i++) {
  // Generate random properties for the ball
  let radius = getRandom(10, 20);
  let x = getRandom(radius, CANVAS_WIDTH - radius);
  let y = getRandom(radius, CANVAS_HEIGHT - radius);
  let dx = getRandom(-2, 2);
  let dy = getRandom(-2, 2);
  // Generate a random color for the ball
  let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  // Create a new ball and add it to the array
  balls.push(new Ball(x, y, dx, dy, radius, color));
}

/**
 * The main draw function that clears the canvas and draws the balls in their new positions.
 */
function draw() {
  // Clear the entire canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Draw each ball and update its position
  for (let i = 0; i < BALL_COUNT; i++) {
    balls[i].draw(ctx);
    balls[i].update(balls);
  }
  // Call the draw function again in the next frame
  requestAnimationFrame(draw);
}

// Call the draw function to start the animation
draw();
