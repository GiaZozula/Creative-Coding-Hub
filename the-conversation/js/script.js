/**
Project 1 - The Conversation
by Gia

This is my first attempt at using spatial sound in p5 in order to create an approximation of the titular scene from the movie, "The Conversation" (1974).

Notes on how to play:
- Takes 10 seconds to switch from the title screen to the main game
- The goal/controls are very simple, just move the mouse and attempt to hover over the conversation
- After the conversation is over, an end screen will display

*/

"use strict";

//begin with the title state
let state = "title";

//defining a timer that will be used to switch between states
let timer;

//defining the themesong soundloop and giving it a "isplaying" property to stop harsh noise
let themeSong = {
  isplaying: false,
};

//defining a font
let font;

//defining an ambient soundloop and giving it a "isplaying" property to stop harsh noise
let ambientSound = {
  isplaying: false,
};

//defining audioObejcts array and properties
let audioObjects = [];
let numAudioObjects = 10;

//defining convo array and properties
let convoObjects = [];
let numConvoObjects = 1;
let convoSound;

//defining image assets
let titleImg;
let backgroundImg;
let endImg;
let convoImg;
let scopeImg;

//these are the individual sound sources that will be loaded with specific sound files
let dogSound;
let dogSound2;
let bandSound;
let germansSound;
let basketballSound;
let voicesSound;
let skatersSound;

function preload() {
  //preload the theme, a total banger
  themeSong = loadSound(`assets/sounds/themesong.mp3`);

  //preload a font
  font = loadFont(`assets/fonts/font.ttf`);

  //preload the images
  titleImg = loadImage(`assets/images/titleImg.png`);
  backgroundImg = loadImage(`assets/images/background.gif`);
  convoImg = loadImage(`assets/images/convoImg.gif`);
  endImg = loadImage(`assets/images/end.png`);
  scopeImg = loadImage(`assets/images/scope.png`);

  //preload a general, background ambience
  ambientSound = loadSound(`assets/sounds/ambientsound.mp3`);

  //preload the conversation
  convoSound = loadSound(`assets/sounds/theconvo.mp3`);

  //preload the individual spatialized sound effects
  dogSound = loadSound(`assets/sounds/bark.mp3`);
  dogSound2 = loadSound(`assets/sounds/bark2.mp3`);
  bandSound = loadSound(`assets/sounds/band.mp3`);
  germansSound = loadSound(`assets/sounds/germans.mp3`);
  basketballSound = loadSound(`assets/sounds/basketball.mp3`);
  voicesSound = loadSound(`assets/sounds/voices.mp3`);
  skatersSound = loadSound(`assets/sounds/skaters.mp3`);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETUP

function setup() {
  createCanvas(800, 600);
  textFont(font);

  //set up the conversation as an audio object
  let theConvo = new ConvoObject(
    random(0, width),
    random(0, height),
    convoSound
  );
  convoObjects.push(theConvo);

  //adding dogs, layered with a couple park ambience recordings
  let dog = new AudioObject(random(0, width), random(0, height), dogSound);
  audioObjects.push(dog);

  //adding more dogs, layered with a couple park ambience recordings
  let dog2 = new AudioObject(random(0, width), random(0, height), dogSound2);
  audioObjects.push(dog2);

  //adding the marching band
  let marchingBand = new AudioObject(
    random(0, width),
    random(0, height),
    bandSound
  );
  audioObjects.push(marchingBand);

  //add some German tourists
  let germans = new AudioObject(
    random(0, width),
    random(0, height),
    germansSound
  );
  audioObjects.push(germans);

  //basketball!
  let bball = new AudioObject(
    random(0, width),
    random(0, height),
    basketballSound
  );
  audioObjects.push(bball);

  //some voices, layered with other ambient sounds
  let voices = new AudioObject(
    random(0, width),
    random(0, height),
    voicesSound
  );
  audioObjects.push(voices);

  //skaters, layered with some voices and park ambience
  let skaters = new AudioObject(
    random(0, width),
    random(0, height),
    skatersSound
  );
  audioObjects.push(skaters);
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DRAW

function draw() {
  //begins the timer that will be used to switch states
  timer = millis();

  //divide the millis into an integer for ease of use
  timer = int(timer / 1000);
  console.log(timer);

  //State switching !
  if (state === "title") {
    drawTitle();
  } else if (state === "game") {
    drawGame();
  } else if (state === "end") {
    drawEnd();
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TITLE
function drawTitle() {
  background(titleImg);

  //a little counter to show that this is time-based
  text(timer, 765, 565);

  //after 10 seconds, switch states
  if (timer == 10) {
    state = "game";
  }

  //make sure to only play the theme song as a single loop
  if (!themeSong.isplaying) {
    themeSong.loop();
    themeSong.isplaying = true;
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ GAME

function drawGame() {
  background(backgroundImg);

  //stop the theme music :(
  themeSong.stop();
  themeSong.isplaying = false;

  //get a scope on the mouse
  mouseScope();

  //at 230 seconds, after the conversation finishes, switch states to the end
  if (timer == 230) {
    state = "end";
  }

  //make sure to only play the ambient sound as a single loop
  if (!ambientSound.isplaying) {
    ambientSound.loop();
    ambientSound.isplaying = true;
  }

  // go through the convoObjects array and begin all necessary functions
  for (let i = 0; i < convoObjects.length; i++) {
    let convoObject = convoObjects[i];
    convoObject.play();
    convoObject.move();
    convoObject.mouseOver();
    convoObject.spatialVolume();
  }

  // Go through the audioObject array and begin all necessary functions
  for (let i = 0; i < audioObjects.length; i++) {
    let audioObject = audioObjects[i];
    audioObject.play();
    audioObject.move();
    audioObject.spatialVolume();
  }
}

//a function that will put a scope on the mouse (for during the game state)
function mouseScope() {
  push();
  imageMode(CENTER);
  image(scopeImg, mouseX, mouseY, 450, 275);
  pop();
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END
function drawEnd() {
  background(endImg);

  //stop the ambient loop,
  ambientSound.stop();

  //stop the conversation from playing,
  for (let i = 0; i < convoObjects.length; i++) {
    let convoObject = convoObjects[i];
    convoObject.stop();
  }

  // stop all the sound I say!
  for (let i = 0; i < audioObjects.length; i++) {
    let audioObject = audioObjects[i];
    audioObject.stop();
  }

  //and let's get this rippin' theme loop going again \m/,
  if (!themeSong.isplaying) {
    themeSong.loop();
    themeSong.isplaying = true;
  }
}
