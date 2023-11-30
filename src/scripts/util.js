/**
 * Returns a random number between min and max.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random number between min and max.
 */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Calculates the Euclidean distance between two points (x1, y1) and (x2, y2).
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  // Use the Pythagorean theorem to calculate the distance
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

/**
 * Resolves a collision between two balls by updating their velocities.
 * @param {Object} ball - The first ball object.
 * @param {Object} otherBall - The second ball object.
 */
function resolveCollision(ball, otherBall) {
  const xVelocityDiff = ball.dx - otherBall.dx;
  const yVelocityDiff = ball.dy - otherBall.dy;

  const xDist = otherBall.x - ball.x;
  const yDist = otherBall.y - ball.y;

  // Prevent accidental overlap of balls
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding balls
    const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);

    // Store mass in var for better readability in collision equation
    const m1 = 1; // mass of ball
    const m2 = 1; // mass of otherBall

    // Velocity before equation
    const u1 = rotate(ball.dx, ball.dy, angle);
    const u2 = rotate(otherBall.dx, otherBall.dy, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.x, v1.y, -angle);
    const vFinal2 = rotate(v2.x, v2.y, -angle);

    // Swap ball velocities for realistic bounce effect
    ball.dx = vFinal1.x;
    ball.dy = vFinal1.y;

    otherBall.dx = vFinal2.x;
    otherBall.dy = vFinal2.y;
  }
}

/**
 * Rotates coordinate system for velocities.
 * Takes velocities and alters them as if the coordinate system they're on was rotated.
 * @param {number} dx - The velocity along the x-axis.
 * @param {number} dy - The velocity along the y-axis.
 * @param {number} angle - The angle to rotate the coordinate system.
 * @returns {Object} The rotated velocities.
 */
function rotate(dx, dy, angle) {
  return {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };
}
