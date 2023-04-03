class AudioObject {
  //basic properties of the AudioObject class
  constructor(x, y, sound) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.sound = sound;
    this.size = 200;
    this.speed = 3.25;
    this.changeDirection = 0.2;
    this.isplaying = false;
  }

  //check to see if it is playing!
  play() {
    if (!this.isplaying) {
      this.sound.loop();
      this.isplaying = true;
    }
  }

  //adding a stop ability for the end state
  stop() {
    if (this.isplaying) {
      this.sound.stop();
      this.isplaying = false;
    }
  }

  move() {
    // First have a randomized chance of direction change
    let r = random(0, 1);
    if (r < this.changeDirection) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // add the velocity to the positon to get move the object
    this.x += this.vx;
    this.y += this.vy;

    // Constrain to the bounds of the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  //Pippin's wonderful code that got me started on spatial audio
  spatialVolume() {
    let volume = map(dist(mouseX, mouseY, this.x, this.y), 0, 250, 1, 0);
    volume = constrain(volume, 0, 1);
    this.sound.setVolume(volume);
  }
}
