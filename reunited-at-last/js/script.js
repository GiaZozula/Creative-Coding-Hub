/**

██████████████████████████████████████████████████████████████████████████████████████████
█▄─▄▄▀█▄─▄▄─█▄─██─▄█▄─▀█▄─▄█▄─▄█─▄─▄─█▄─▄▄─█▄─▄▄▀████▀▄─██─▄─▄─███▄─▄████▀▄─██─▄▄▄▄█─▄─▄─█
██─▄─▄██─▄█▀██─██─███─█▄▀─███─████─████─▄█▀██─██─████─▀─████─██████─██▀██─▀─██▄▄▄▄─███─███
▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▄▀▀▄▄▄▀▀▄▄▀▄▄▄▀▀▄▄▄▀▀▄▄▄▄▄▀▄▄▄▄▀▀▀▀▄▄▀▄▄▀▀▄▄▄▀▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀
by Gia

Is the page loading properly? Why is it basically blank?
What's that horrible distorted drone?
Why is there an awkwardly placed grey circle?
Why is the cursor a cross? Is this a spreadsheet or some weird mystical thing?
Is this program as terrible as it first appears?

These are some of the questions I imagine anyone who engages with this program
will have at first. Hopefully through the use of ARROW KEYS, the MOUSE,
LISTENING, and LOOKING, you will be able to reuinte the two spirits.

Good luck!

*/

"use strict";

//GLOBAL VARIABLES ------------------------------------------------------------

//sets the current state
let state = "tutorial";

//the position and size of the target as it appears in the tutorial
let tutorialTarget = {
  x: 1500,
  y: 600,
  size: 20,
};

//placement of the gear image in the intro
let gearPosition = {
  x: 400,
  y: 600,
  width: 150,
  height: 150,
};

//was initially going to use this to switch the controls between the two spirits
//but this feature has been put on ice
let searchingSpiritActive = true;

// declaring the variables for the stationary spirit, including its multiple hitboxes
let stationarySpirit = {
  x: 0,
  y: 0,
  size: 10,
};
let stationarySpiritHBox1 = {
  x: 0,
  y: 0,
  size: 100,
};

let stationarySpiritHBox2 = {
  x: 0,
  y: 0,
  size: 225,
};

// declaring the minimap and its frame
let miniMap = {
  x: 400,
  y: 500,
  boundsXRight: 0,
  boundsYBottom: 0,
  width: 500,
  height: 450,
};

let miniMapFrame = {
  x: 652,
  y: 705,
  width: 695,
  height: 605,
};

//declaring the viewport and its frame
let viewport = {
  x: 1240,
  y: 600,
  width: 420,
  height: 420,
};

let viewportFrame = {
  x: 1258,
  y: 470,
  width: 1300,
  height: 1300,
};

//declaring the HUD background position
let hudBgPosition = {
  x: 275,
  y: 150,
  width: 1400,
  height: 900,
};

//declaring the overlay variable, which is used for various visual elements
let overlayPosition = {
  x: 960,
  y: 600,
  introW: 1400,
  introH: 1200,
  width: 2800,
  height: 2600,
  altWidth: 1920,
  altHeight: 1080,
  altIntroW: 1200,
  altIntroH: 800,
  overlayRate2: 660,
  overlayRate3: 1500,
  rectLIntroX: 300,
  rectLIntroY: 100,
  rectRIntroX: 1400,
  rectRIntroY: 100,
  rectIntroW: 200,
  rectIntroH: 800,
};

//declaring audioObjects array and properties
let audioObjects = [];
let numAudioObjects = 4;

//declaring the arrays for foreground images
let foregroundImages = [];
let numForegroundImages = 2;
let foregroundImageObjects = [];
let numForeGroundImageObjects = 2;

//declaring the arrays for background images
let backgroundImages = [];
let numBackgroundImages = 3;
let backgroundImageObjects = [];
let numBackgroundImageObjects = 3;

//declaring an array for a clickable "button" on the GUI
let buttonImages = [];
let numButtonImages = 1;
let buttonObjects = [];
let numButtonObjects = 1;

//declaring the gate variables, for Left and Right gates
let gateLImg;
let gateL = {
  x: 828,
  y: 600,
  xClose: 828,
  xOpen: 420,
  speed: 2,
  width: 500,
  height: 500,
};

let gateRImg;
let gateR = {
  x: 1088,
  y: 600,
  xClose: 1088,
  xOpen: 1500,
  speed: 2,
  width: 500,
  height: 500,
};

//declaring the arrow and its position
let arrowImg;
let arrowPosition = {
  x: 958,
  y: 650,
  width: 100,
  height: 100,
};

//declaring variables for the audio
let voiceSound;
let oscillator = {
  isPlaying: false,
};
let envelope;
let noteC2 = 65.41;
let noteE2 = 82.41;

//declaring other assets
let viewportFrameImg;
let miniMapFrameImg;
let darknessImg;
let hudBgImg;
let overlayImg;
let overlayImg2;
let overlayImg3;
let font;
let gearImg;
let sandImg;

//defining the outro text
let outroText = "Reunited At Last";
let outroText2 = "by Gia for CART 263";

// PRELOAD --------------------------------------------------------------------
function preload() {
  //preload the sound
  voiceSound = loadSound("assets/sounds/ghostvoice.mp3");

  //preload the image assets (that aren't in arrays)
  gearImg = loadImage("assets/images/gear.png");
  arrowImg = loadImage("assets/images/arrow.png");
  darknessImg = loadImage("assets/images/darknessImg.gif");
  gateLImg = loadImage("assets/images/gateL.png");
  gateRImg = loadImage("assets/images/gateL.png");
  viewportFrameImg = loadImage("assets/images/viewportframe.png");
  miniMapFrameImg = loadImage("assets/images/minimapframe.png");
  sandImg = loadImage("assets/images/sand.png");
  hudBgImg = loadImage("assets/images/hudbg.png");
  overlayImg = loadImage("assets/images/overlay.png");
  overlayImg2 = loadImage("assets/images/overlay2.png");
  overlayImg3 = loadImage("assets/images/overlay3.png");

  //preload the font
  font = loadFont("assets/fonts/font.ttf");

  // //preload images that will end up in the foreground in an array
  for (let i = 0; i < numForegroundImages; i++) {
    foregroundImages[i] = loadImage(
      "assets/images/foregroundImage" + i + ".png"
    );
  }

  //preload images that will end up in the background in an array
  for (let i = 0; i < numBackgroundImages; i++) {
    backgroundImages[i] = loadImage(
      "assets/images/backgroundImage" + i + ".gif"
    );
  }
}

//SETUP -----------------------------------------------------------------------
function setup() {
  //set up the canvas, imagemode, rectmode
  createCanvas(1920, 1200);
  imageMode(CENTER);
  rectMode(CORNER);

  //begin the p5 sound oscillator and envelope
  oscBegin();

  //this calculates the bounds for minimap so I don't have to do it manually
  //every time I make an adjustment, which was driving me nuts! ;)
  miniMapCalculator();

  // Using for loops, set up the image and audio arrays
  setUpArrays();
  stationarySpiritPosition();
}

//DRAW ------------------------------------------------------------------------
function draw() {
  background(255);

  //State switcher
  if (state === "tutorial") {
    drawTutorial();
  } else if (state === "intro") {
    drawIntro();
  } else if (state === "game") {
    drawGame();
  } else if (state === "outro") {
    drawOutro();
  }
}

//DRAWTutorial -------------------------------------------------------------------
function drawTutorial() {
  background(255);

  //this sets up the spatial volume for the Tutorial and Intro sections, that uses
  //an oscillator that reacts to distance from the mouse position to a target ellipse
  spatialVolumeIntro();

  //determines if the mouse if overlapping with the target
  mouseOver();
}

//DRAWINTRO -------------------------------------------------------------------
function drawIntro() {
  background(255);
  fill(255);
  textFont(font);
  text("intro state", width / 2, height / 2);
  //display the gate
  gateDisplay();

  //add a graphical overlay, mostly to hide the gates so they go "offscreen" :)
  drawOverlay();

  //sets up the gear button
  buttonSetUp();

  //this checks if the gate has reached its fully open value, which then causes an arrow
  //to appear. If the user no longer holds the mouse button down, the door closes and then
  //arrow disappears. This is intended to teach the user to also use the arrow keys
  gateFinishCheck();
}

//DRAWGAME --------------------------------------------------------------------
function drawGame() {
  background(255);
  //slowly fade out the oscillator from the previous two scenes
  oscillator.amp(0, 5);

  //cycle through the background images array, pull one out, and display it!
  bgImgDisplay();

  //display the "darkness" (that I actually ended changing to pure white!) that
  //overlays the viewport when the user is too far away from the stationarySpirit.
  //Meant to indicate that the user has to turn around!
  darkDisplay();

  //display the mini map
  miniMapDisplay();

  //display the stationarySpirit (although this will be invisible in the final build, just here for testing purposes)
  stationarySpiritDisplay();

  // Go through the audioObject array and begin all necessary functions
  audioObjectBegin();

  //draw the HUD and overlay effects
  drawHUD();
  drawOverlay();
}

//DRAWOUTRO -------------------------------------------------------------------
function drawOutro() {
  push();
  textSize(60);
  textAlign(CENTER);
  background(255);
  fill(0);
  textFont(font);
  text(outroText, windowWidth / 2.5, windowHeight / 2);
  textSize(40);
  text(outroText2, windowWidth / 1.5, windowHeight / 1.5);
  pop();
}

// FUCNTIONS ------------------------------------------------------------------

//Pippin's wonderful code that got me started on spatial audio, adapted
function spatialVolumeIntro() {
  let volume = map(
    dist(mouseX, mouseY, tutorialTarget.x, tutorialTarget.y),
    0,
    1050,
    1,
    0
  );
  volume = constrain(volume, 0, 1);
  oscillator.amp(0.5);
  oscillator.freq(noteC2);
  oscillator.amp(volume);

  push();
  noStroke();
  fill(150);
  ellipse(tutorialTarget.x, tutorialTarget.y, tutorialTarget.size);
  pop();
}

//mouseOver function for during the tutorial
function mouseOver() {
  let d = dist(mouseX, mouseY, tutorialTarget.x, tutorialTarget.y);
  if (d < tutorialTarget.size / 2) {
    state = "intro";
  }
}

function setUpArrays() {
  // Using a for loop, set up the foregroundImageObjects array
  for (let i = 0; i < numForegroundImages; i++) {
    let foreground = foregroundImages[i];
    let foregroundImage = new ImageObject(
      overlayPosition.x,
      overlayPosition.y,
      foreground,
      overlayPosition.width,
      overlayPosition.height
    );
    foregroundImageObjects.push(foregroundImage);
  }

  // Using a for loop, set up the background images array
  for (let i = 0; i < numBackgroundImages; i++) {
    let background = backgroundImages[i];
    let backgroundImage = new ImageObject(
      viewport.x,
      viewport.y,
      background,
      viewport.width,
      viewport.height
    );
    backgroundImageObjects.push(backgroundImage);
  }

  // Using a for loop, set up the gearButton
  let gearButton = new ImageObject(
    gearPosition.x,
    gearPosition.y,
    gearImg,
    gearPosition.width,
    gearPosition.height,
    "false"
  );
  buttonObjects.push(gearButton);

  //The code for the audio object was adapted from my Project 1 code
  let searchingSpirit = new AudioObject(
    random(miniMap.x, miniMap.boundsXRight),
    random(miniMap.y, miniMap.boundsYBottom),
    voiceSound
  );
  audioObjects.push(searchingSpirit);
}

//place the stationarySpirit at a random starting location, along with its two wider hitboxes
function stationarySpiritPosition() {
  stationarySpirit.x = random(miniMap.x, miniMap.boundsXRight);
  stationarySpirit.y = random(miniMap.y, miniMap.boundsYBottom);
  stationarySpiritHBox1.x = stationarySpirit.x;
  stationarySpiritHBox1.y = stationarySpirit.y;
  stationarySpiritHBox2.x = stationarySpirit.x;
  stationarySpiritHBox2.y = stationarySpirit.y;
}

//function for the display of the stationarySpirit (this will be made invisible, only here for testing purposes)
//Also displays all of its hitboxes
function stationarySpiritDisplay() {
  // push();
  // noStroke();
  // fill(150);
  // ellipse(
  //   stationarySpiritHBox2.x,
  //   stationarySpiritHBox2.y,
  //   stationarySpiritHBox2.size
  // );
  // pop();
  //
  // push();
  // noStroke();
  // fill(100);
  // ellipse(
  //   stationarySpiritHBox1.x,
  //   stationarySpiritHBox1.y,
  //   stationarySpiritHBox1.size
  // );
  // pop();
  // push();
  // noStroke();
  // fill(0);
  // ellipse(stationarySpirit.x, stationarySpirit.y, stationarySpirit.size);
  // pop();
}

//cycle through the background images array, pull one out, and display it!
function bgImgDisplay() {
  for (let i = 0; i < backgroundImageObjects.length; i++) {
    let imageObject = backgroundImageObjects[i];
    imageObject.display();
  }
}

//for layering purposes, darknessImg needs to be here instead of with the other audioObject functions
function darkDisplay() {
  for (let i = 0; i < audioObjects.length; i++) {
    let audioObject = audioObjects[i];
    audioObject.darknessImgDisplay();
  }
}

// Go through the audioObject array and begin all necessary functions
function audioObjectBegin() {
  for (let i = 0; i < audioObjects.length; i++) {
    let audioObject = audioObjects[i];
    audioObject.play();
    audioObject.userInput();
    audioObject.spatialVolume();
    audioObject.checkHboxOverlap();
    audioObject.display();
    audioObject.mouseOver();
    audioObject.endGameCheck();
    audioObject.stopSound();
  }
}

//function for the display of the miniMap
function miniMapDisplay() {
  push();
  fill(255);
  image(sandImg, miniMap.x, miniMap.y, miniMap.width * 2, miniMap.height * 2);
  pop();
}

//function for the button/gear during the intro state
function buttonSetUp() {
  // go through the buttonObjects array and begin all necessary functions
  for (let i = 0; i < buttonObjects.length; i++) {
    let buttonObject = buttonObjects[i];
    buttonObject.display();
    buttonObject.mouseOver();
    if (buttonObject.overlap) {
      buttonObject.mousePressed();
    }
  }
  if (!mouseIsPressed) {
    gateClose();
  }
}

//display the Gates
function gateDisplay() {
  image(gateLImg, gateL.x, gateL.y, gateL.width, gateL.height);
  image(gateRImg, gateR.x, gateR.y, gateR.width, gateR.height);
}

//function for the opening movement of the gates
function gateOpen() {
  gateL.x -= gateL.speed;
  if (gateL.x <= gateL.xOpen) {
    gateL.x = gateL.xOpen;
  }

  gateR.x += gateR.speed;
  if (gateR.x >= gateR.xOpen) {
    gateR.x = gateR.xOpen;
  }
}

//function for the closing movement of the gates
function gateClose() {
  gateL.x += gateL.speed;
  if (gateL.x >= gateL.xClose) {
    gateL.x = gateL.xClose;
  }

  gateR.x -= gateR.speed;
  if (gateR.x <= gateR.xClose) {
    gateR.x = gateR.xClose;
  }
}

//this function handles the arrow being displayed and possible state switch
function gateFinishCheck() {
  if (gateL.x === gateL.xOpen && gateR.x === gateR.xOpen) {
    image(
      arrowImg,
      arrowPosition.x,
      arrowPosition.y,
      arrowPosition.width,
      arrowPosition.height
    );
  }
  if (
    gateL.x === gateL.xOpen &&
    gateR.x === gateR.xOpen &&
    keyIsDown(UP_ARROW)
  ) {
    state = "game";
  }
}

//draw the HUD!!
function drawHUD() {
  push();
  imageMode(CORNER);
  image(
    hudBgImg,
    hudBgPosition.x,
    hudBgPosition.y,
    hudBgPosition.width,
    hudBgPosition.height
  );
  pop();
  image(
    viewportFrameImg,
    viewportFrame.x,
    viewportFrame.y,
    viewportFrame.width,
    viewportFrame.height
  );
  //
  image(
    miniMapFrameImg,
    miniMapFrame.x,
    miniMapFrame.y,
    miniMapFrame.width,
    miniMapFrame.height
  );
}

//displays the overlay image and effects, with slight differences depending on state
//VERY long function
function drawOverlay() {
  if (state === "intro") {
    //adding extra white coverage for the overlay
    push();
    noStroke();
    fill(255);
    rectMode(CORNER);
    rect(
      overlayPosition.rectLIntroX,
      overlayPosition.rectLIntroY,
      overlayPosition.rectIntroW,
      overlayPosition.rectIntroH
    );
    rect(
      overlayPosition.rectRIntroX,
      overlayPosition.rectRIntroY,
      overlayPosition.rectIntroW,
      overlayPosition.rectIntroH
    );
    pop();

    //adding the overlay images
    image(
      overlayImg,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.introW,
      overlayPosition.introH
    );

    push();
    image(
      overlayImg2,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.altIntroW,
      overlayPosition.altIntroH
    );
    pop();

    push();
    image(
      overlayImg3,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.altIntroW,
      overlayPosition.altIntroH
    );
    pop();
  } else {
    //overlay in the game state

    // // Go through the foregroundImages array and display the image
    for (let i = 0; i < foregroundImageObjects.length; i++) {
      let imageObject = foregroundImageObjects[i];
      push();
      //using a sinwave, this causes fluctuating opacity for the foreground element
      // tint(255, 255 * sin(millis() / 1300));
      imageObject.display();
      pop();
    }

    image(
      overlayImg,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.width,
      overlayPosition.height
    );

    push();
    tint(255, 255 * sin(millis() / 750));
    image(
      overlayImg2,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.altWidth,
      overlayPosition.altHeight
    );
    pop();

    push();
    tint(255, 255 * sin(millis() / 900));
    image(
      overlayImg3,
      overlayPosition.x,
      overlayPosition.y,
      overlayPosition.altWidth,
      overlayPosition.altHeight
    );
    pop();
  }
}

//this gets the synth waves going in the set up! uses an oscillator and envelope.
//I brushed up on this topic by looking at the reference and watching a Code Train video
function oscBegin() {
  envelope = new p5.Env();
  envelope.setADSR(0.05, 0.1, 0.1, 1);
  envelope.setRange(0.1, 0);

  oscillator = new p5.Oscillator();
  oscillator.setType("sine");
  oscillator.start();
  oscillator.amp(envelope);
  oscillator.freq(noteC2);
}

//doesn't actually stop the oscillator, just turns it down :)
function stopOsc() {
  {
    oscillator.amp(0, 1);
    oscillator.isPlaying = false;
  }
}

//a little basic math to keep me sane
function miniMapCalculator() {
  miniMap.boundsXRight = miniMap.x + miniMap.width;
  miniMap.boundsYBottom = miniMap.y + miniMap.height;
}
