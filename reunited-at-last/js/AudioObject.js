//Some of this code was adapted from my Project 1
class AudioObject {
  //basic properties of the AudioObject class that will be used for the "Searching Spirit"
  constructor(x, y, sound) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    //this calculates the bounds for minimap so I don't have to do it manually every time I make an adjustment, which was driving me nuts! ;)
    this.boundsXLeft = miniMap.x + 1;
    this.boundsXRight = miniMap.boundsXRight - 1;
    this.boundsYLeft = miniMap.y - 1;
    this.boundsYBottom = miniMap.boundsYBottom - 1;
    this.sound = sound;
    this.size = 10;
    this.speed = 2;
    this.isPlaying = false;
    this.spatialBegin = 225;
    this.volMin = 0;
    this.volMax = 0.25;
    this.isOverlapping1 = false;
    this.isOverlapping2 = false;
    this.isOverlapping3 = false;
    this.hasSpawned = false;
    this.darknessBegin = 225;
    this.darknessTint = 225;
  }

  //check to see if the sound is playing!
  play() {
    if (!this.isPlaying) {
      this.sound.loop();
      this.isPlaying = true;
    }
  }

  //adding a stop sound ability for the end state
  stopSound() {
    if (this.isPlaying && state === "outro") {
      this.sound.stop();
      this.isPlaying = false;
    }
  }

  //keyboard controls for movement
  userInput() {
    // first check if the searchingSpirit switch is on
    if (searchingSpiritActive) {
      if (keyIsDown(RIGHT_ARROW)) {
        this.vx = this.speed;
      } else if (keyIsDown(LEFT_ARROW)) {
        this.vx = -this.speed;
      } else if (keyIsDown(UP_ARROW)) {
        this.vy = -this.speed;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.vy = this.speed;
      } else {
        this.vx = 0;
        this.vy = 0;
      }
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
    }
    //if the stationarySpirit is currently switched on, take away these controls
    else if (!searchingSpiritActive) {
      this.vx = 0;
      this.vy = 0;
    }
    //adding the boundaries of the minimap
    if (this.x < this.boundsXLeft) {
      this.x = this.boundsXLeft;
    } else if (this.x > this.boundsXRight) {
      this.x = this.boundsXRight;
    } else if (this.y < this.boundsYLeft) {
      this.y = this.boundsYLeft;
    } else if (this.y > this.boundsYBottom) {
      this.y = this.boundsYBottom;
    }
  }
  //Pippin's wonderful code that got me started on spatial audio, adapted to
  //reflect the position of the searching spirit in relation to the stationary spirit
  spatialVolume() {
    let volume = map(
      dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y),
      0,
      this.spatialBegin,
      1,
      0
    );
    volume = constrain(volume, this.volMin, this.volMax);
    this.sound.setVolume(volume);
  }

  //this controls the opacity of the darknessImg overlay that disappears as the searchingSpirit gets closer to the stationary spirit
  darknessImgDisplay() {
    let opacity =
      dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y) -
      this.darknessBegin;
    push();
    rectMode(CENTER);
    fill(255, 255, 255, opacity);
    rect(viewport.x, viewport.y, viewport.width, viewport.height);
    pop();
  }

  //check if the searchingSpirit is overlapping with the stationarySpirit or its wider hitboxes
  checkHboxOverlap() {
    let d = dist(stationarySpirit.x, stationarySpirit.y, this.x, this.y);
    if (d < stationarySpirit.size / 2 + this.size / 2) {
      console.log("overlap");
      this.isOverlapping1 = true;
    } else {
      this.isOverlapping1 = false;
    }

    let d2 = dist(
      stationarySpiritHBox1.x,
      stationarySpiritHBox1.y,
      this.x,
      this.y
    );
    if (d2 < stationarySpiritHBox1.size / 2 + this.size / 2) {
      console.log("overlap2");
      this.isOverlapping2 = true;
    } else {
      this.isOverlapping2 = false;
    }

    let d3 = dist(
      stationarySpiritHBox2.x,
      stationarySpiritHBox2.y,
      this.x,
      this.y
    );
    if (d3 < stationarySpiritHBox2.size / 2 + this.size / 2) {
      console.log("overlap3");
      this.isOverlapping3 = true;
      this.swapViewportImg();
    } else {
      this.isOverlapping3 = false;
    }
  }

  //display the searchingSpirit
  display() {
    fill(255);
    ellipse(this.x, this.y, this.size);
    //an if statement that ensures that the searchingSpirit spawns somewhere not in a hitbox
    if (this.isOverlapping3 === true && this.hasSpawned === false) {
      this.x = random(miniMap.x, miniMap.boundsXRight);
      this.y = random(miniMap.y, miniMap.boundsYBottom);
    } else if (this.isOverlapping3 === false && this.hasSpawned === false) {
      this.hasSpawned = true;
    }
  }

  //check if the mouse is hovering over the hitboxes
  mouseOver() {
    let d = dist(
      mouseX,
      mouseY,
      stationarySpiritHBox2.x,
      stationarySpiritHBox2.y
    );
    if (d < stationarySpiritHBox2.size / 2) {
      console.log("mouzzz");
      oscillator.amp(envelope);
      oscillator.freq(noteC2);
      envelope.play();
    }
  }

  //checks if the searching spirit is overlapping with the stationary spirit.
  //if so, we need to switch states to the outro!
  endGameCheck() {
    if (this.isOverlapping1 === true && this.hasSpawned === true) {
      state = "outro";
    }
  }

  //this function changes the images that appear in the viewport if the user
  //overlaps with the stationary spirit's hitboxes. It also plays oscillator
  //tones based off which hitbox is currently being crossed
  swapViewportImg() {
    if (this.isOverlapping3 === true && this.hasSpawned === true) {
      oscillator.amp(envelope);
      oscillator.freq(noteC2);
      envelope.play();

      image(
        backgroundImages[1],
        viewport.x,
        viewport.y,
        viewport.width,
        viewport.height
      );
      if (this.isOverlapping2 === true && this.hasSpawned === true) {
        oscillator.amp(envelope);
        oscillator.freq(noteE2);
        envelope.play();
        image(
          backgroundImages[0],
          viewport.x,
          viewport.y,
          viewport.width,
          viewport.height
        );
      } else {
        stopOsc();
      }
    }
  }
}
