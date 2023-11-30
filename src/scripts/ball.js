/**
 * Class representing a ball.
 */
class Ball {
  /**
   * Create a ball.
   * @param {number} x - The x-coordinate of the ball.
   * @param {number} y - The y-coordinate of the ball.
   * @param {number} dx - The velocity along the x-axis.
   * @param {number} dy - The velocity along the y-axis.
   * @param {number} radius - The radius of the ball.
   * @param {string} color - The color of the ball.
   */
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  /**
   * Draw the ball on the canvas.
   * @param {Object} ctx - The 2D rendering context for the drawing surface of a canvas.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * Update the position of the ball and handle collisions with other balls and the canvas edges.
   * @param {Array} balls - An array of all the balls.
   */
  update(balls) {
    // Check for collisions with other balls
    for (let i = 0; i < balls.length; i++) {
      // Don't check for collision with self
      if (this === balls[i]) continue;
      // If the distance between the balls is less than their combined radius, they are colliding
      if (
        distance(this.x, this.y, balls[i].x, balls[i].y) - this.radius * 2 <
        0
      ) {
        resolveCollision(this, balls[i]);
      }
    }

    // Check for collisions with the canvas edges
    if (
      this.x + this.dx > CANVAS_WIDTH - this.radius ||
      this.x + this.dx < this.radius
    ) {
      this.dx = -this.dx; // Reverse x-direction
    }
    if (
      this.y + this.dy > CANVAS_HEIGHT - this.radius ||
      this.y + this.dy < this.radius
    ) {
      this.dy = -this.dy; // Reverse y-direction
    }

    // Update position
    this.x += this.dx;
    this.y += this.dy;
  }
}
