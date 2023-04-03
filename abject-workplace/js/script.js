/**
  Epilepsy Warning --> Flashing lights!

  ~~ ABJECT WORKPLACE ~~ by Gia ~~

This is a prototype of a game that simulates (in a very reduced, gamified manner) the stress of working at a warehouse like Amazon.
The player has to respond to orders from the boss, using conveyor belts.

Fill up the bar in the top left-hand corner and you will get to keep your job.
Do so by dragging the correct products (skulls) onto the dropzone (white area) within the time limit.

*/

"use strict";

//starting state
let state = "title";

// this is a list of possible orders that are stored in an array
let orders = ["RED", "BLUE", "GREEN", "YELLOW"];

//this is the starting order, that will be replaced once the game begins
let currentOrder = "ARE YOU READY?";

//this is an object that counts the time (going up)
let gameCounter;

//this sets the max amount of time for the game to be completed within (millis)
//if we subtract the gameTimer from the timeLimit, we will get how much time is left
let maxTime = 30;

//give the Timer some properties
let gameTimerXY = {
  x: 1100,
  y: 50,
};

//give the Timer a font
let gameTimerFont;

//this is the other font that is used in the game
let font2;

//this variable is used to make the timer count down rather than up
let countDown;

//this sets a timer, and ties it to the orders changing
let orderTimer = 3000;
let orderChange = orderTimer;

//this sets up the variables and an array for the products
let products = [];
let numProducts = 25;

//variable for the dropzone class
let dropzone = undefined;

//variable for the conveyorbelt class
let conveyorbelt = undefined;

//title state graphics + variables
let titleCard;
let titleBg;

//variables for a hover over button at the title
let buttonImg;
let buttonInImg;
let button = {
  x: 160,
  y: 700,
  width: 350,
  height: 100,
};

// this image just notifies the player to click to start
let beginImg;
let begin = {
  x: 1040,
  y: 700,
};

//this variable will store an image listing the controls (and light story)
let controlCardImg;
let controlCard = {
  x: -1000,
  y: 0,
  xOut: 0,
  xIn: -1000,
  move: 10,
  width: 1200,
  height: 800,
};

//variable for the rentbar class
let rentbar = undefined;

//overlay graphics variables
let smoke = {
  x: 0,
  y: 0,
  speed: 2,
};
let noiseOverlay;
let purpleMist;

//variable for the boss image
let tv;

//properties of this image (I used two naming conventions, I'd like to change but I'm running late)
let tvProps = {
  x: 0,
  y: 0,
  h: 0,
  y: 0,
};

//variable for the background colour of the tv that changes
let tvScreen = {
  x: 210,
  y: 250,
  h: 160,
  w: 160,
};

//variables for the order images
let yellowImg;
let blueImg;
let greenImg;
let redImg;

//the different products (y = yellow, b = blue, g = green, r = red)
let skully;
let skullb;
let skullg;
let skullr;

//background gif for the main game state
let bgGif;

//HUD element to make the rentbar more interesting looking
let grossFrame;

//audio variables
let gameSong = {
  isplaying: false,
};
let yellowMp3 = {
  isplaying: false,
};
let blueMp3 = {
  isplaying: false,
};
let redMp3 = {
  isplaying: false,
};
let greenMp3 = {
  isplaying: false,
};
let areYouReady = {
  isplaying: false,
};
let workMp3 = {
  isplaying: false,
};

function preload() {
  //preload fonts
  gameTimerFont = loadFont("assets/font.ttf");
  font2 = loadFont("assets/font2.ttf");

  //preload title screen graphics
  titleCard = loadImage("assets/images/title.png");
  buttonImg = loadImage("assets/images/howtoplay.png");
  buttonInImg = loadImage("assets/images/howtoplaypressed.png");
  controlCardImg = loadImage("assets/images/controls.png");
  titleBg = loadImage("assets/images/titlebg.png");
  beginImg = loadImage("assets/images/begin.png");

  //preload tv screen images
  yellowImg = loadImage("assets/images/yellow.gif");
  blueImg = loadImage("assets/images/blue.gif");
  greenImg = loadImage("assets/images/green.gif");
  redImg = loadImage("assets/images/red.gif");

  //preload products images
  skully = loadImage("assets/images/skully.png");
  skullb = loadImage("assets/images/skullb.png");
  skullg = loadImage("assets/images/skullg.png");
  skullr = loadImage("assets/images/skullr.png");

  //preload HUD and graphics elements for the  game state
  bgGif = loadImage("assets/images/bggif.gif");
  tv = loadImage("assets/images/tv.png");
  grossFrame = loadImage("assets/images/grossframe.png");

  //gfx overlays
  noiseOverlay = loadImage("assets/images/noise.gif");
  smoke = loadImage("assets/images/smoke.png");
  purpleMist = loadImage("assets/images/purplemist.png");

  //preload audio
  gameSong = loadSound("assets/sounds/gamesong.mp3");
  yellowMp3 = loadSound("assets/sounds/yellow.mp3");
  blueMp3 = loadSound("assets/sounds/blue.mp3");
  redMp3 = loadSound("assets/sounds/red.mp3");
  greenMp3 = loadSound("assets/sounds/green.mp3");
  areYouReady = loadSound("assets/sounds/areyouready.mp3");
}

//SET UP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setup() {
  //some basic default set up for the sketch
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);
  userStartAudio();

  //create the Dropzone
  let x = 800;
  let y = 0;
  dropzone = new Dropzone(x, y);

  //create the converyor belt
  conveyorbelt = new Conveyorbelt();

  //create the rentbar
  rentbar = new Rentbar(x, y);

  // Create the correct number of products and put them in our array
  //some of this code was adapted from a CodeTrain video about overlapping circles, though it is fairly different
  while (products.length < numProducts)
    for (let i = 0; i < numProducts; i++) {
      let x = random(0, width);
      //this keeps them within the conveyor belt boundary
      let y = constrain(
        random(conveyorbelt.topEdge + conveyorbelt.padding, height),
        conveyorbelt.topEdge,
        conveyorbelt.bottomEdge - conveyorbelt.padding
      );
      //create a new product
      let product = new Product(x, y);
      //check if they're overlapping with any that are already drawn
      let overlapping = false;
      for (let j = 0; j < products.length; j++) {
        let other = products[j];
        let d = dist(product.x, product.y, other.x, other.y);
        if (d < 35) {
          overlapping = true;
          break;
        }
      }
      //if there's nothing overlapping, we're good to go
      if (!overlapping) {
        products.push(product);
      }
    }

  //assign a velocity and colour to the products
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    //this moves the products
    product.vx = product.speed;
    //this gives a randomness to the products' colour designation
    let r = random(0, 1);
    if (r < 0.25) {
      product.colour = "RED";
    } else if (r > 0.25 && r < 0.5) {
      product.colour = "BLUE";
    } else if (r > 0.5 && r < 0.75) {
      product.colour = "GREEN";
    } else {
      product.colour = "YELLOW";
    }
  }
}

// DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  //set the cursor to the grabby hand, perfect for picking up skulls
  if (mouseIsPressed) {
    cursor("grabbing");
  } else {
    cursor("grab");
  }

  //State switching !
  if (state === "title") {
    drawTitle();
  } else if (state === "game") {
    drawGame();
  } else if (state === "win") {
    drawWin();
  } else if (state === `gameover`) {
    drawGameover();
  }
}

// DRAW TITLE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawTitle() {
  //background is set to a gif
  background(titleBg);
  //make sure there's no looping going on (not currently in use)
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  //adding a graphical overlay of some purple mist
  push();
  imageMode(CENTER);
  tint(255, 255 * sin(millis() / 10));
  image(purpleMist, width / 2, height / 2, 1200, 800);
  pop();

  //this draws the barely legible title "ABJECT WORKPLACE"
  push();
  imageMode(CENTER);
  image(titleCard, width / 2, height / 2);
  pop();

  //this draws the control card off screen
  image(controlCardImg, controlCard.x, controlCard.y);

  // this draws the 'click anywhere to begin' image
  push();
  imageMode(CENTER);
  image(beginImg, begin.x, begin.y);

  //this draws the hover button
  image(buttonImg, button.x, button.y);

  //this detects if the button is being hovered over by the mouse
  if (
    mouseX > button.x - button.width / 2 &&
    mouseX < button.x + button.width / 2 &&
    mouseY > button.y - button.height / 2 &&
    mouseY < button.y + button.height / 2
  ) {
    //if so, draw the darker version of the button for some reactivity
    image(buttonInImg, button.x, button.y);
    //and move out the control card
    if (controlCard.x <= controlCard.xOut) {
      controlCard.x += controlCard.move;
    }
  } else {
    //otherwise move it back
    controlCard.x -= controlCard.move;
  }
  pop();
}

// DRAW WIN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawWin() {
  background(0);
  //stop that incessant robot boss from yelling orders
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  //this draws the win title
  push();
  textFont(font2);
  fill(154, 16, 225);
  stroke(0);
  textSize(20);
  //sad text for a sad victory
  text("You can afford rent. See you tomorrow.", width / 2, height / 2);
  pop();

  // some more visual purple mist flair
  push();
  imageMode(CENTER);
  tint(255, 255 * sin(millis() / 10));
  image(purpleMist, width / 2, height / 2, 1200, 800);
  pop();

  //noise overlay
  push();
  blendMode(SCREEN);
  image(noiseOverlay, 0, 0);
  pop();
}

//DRAW GAMEOVER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawGameover() {
  background(0);
  //stop the loops
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  //this draws the end title
  push();
  textFont(font2);
  fill(154, 16, 225);
  stroke(0);
  textSize(20);
  text(
    "You cannot afford rent this month. And you're fired.",
    width / 2,
    height / 1.15
  );
  pop();

  //a skull in the middle, why not?
  push();
  imageMode(CENTER);
  image(skullg, width / 2, height / 2);
  pop();

  //more purple mist
  push();
  imageMode(CENTER);
  tint(255, 255 * sin(millis() / 10));
  image(purpleMist, width / 2, height / 2, 1200, 800);
  pop();

  //noise overlay
  push();
  blendMode(SCREEN);
  image(noiseOverlay, 0, 0);
  pop();
}

// DRAW THE "GAME" STATE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawGame() {
  background(bgGif);
  songCheck();
  gameOverCheck();
  winCheck();

  // this displays the conveyor belt
  conveyorbelt.display();

  //this displays the dropzone
  dropzone.display();

  //this is the current order before it switches, and plays a little sound bite at the start "ARE YOU READY?"
  if (currentOrder === "ARE YOU READY?") {
    if (!areYouReady.isplaying) {
      areYouReady.play();
      areYouReady.isplaying = true;
    }
  }

  //display and play all of the assets related to the orders --
  // along with the correlating colours for the tv
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (currentOrder === "RED") {
      //this determines the colour of the image on the tv
      image(redImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);

      // switch all of the other booleans off (so they can be turned on again if necessary)
      blueMp3.isplaying = false;
      greenMp3.isplaying = false;
      yellowMp3.isplaying = false;

      //stop everything else that could be playing
      blueMp3.stop();
      greenMp3.stop();
      yellowMp3.stop();

      //play the corresponding colour audio
      if (!redMp3.isplaying) {
        redMp3.loop();
        redMp3.setVolume(0.5);
        redMp3.isplaying = true;
      }
    } else if (currentOrder === "BLUE") {
      image(blueImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      redMp3.isplaying = false;
      greenMp3.isplaying = false;
      yellowMp3.isplaying = false;
      greenMp3.stop();
      yellowMp3.stop();
      redMp3.stop();
      if (!blueMp3.isplaying) {
        blueMp3.loop();
        blueMp3.setVolume(0.5);
        blueMp3.isplaying = true;
      }
    } else if (currentOrder === "GREEN") {
      image(greenImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      blueMp3.isplaying = false;
      redMp3.isplaying = false;
      yellowMp3.isplaying = false;
      blueMp3.stop();
      yellowMp3.stop();
      redMp3.stop();
      if (!greenMp3.isplaying) {
        greenMp3.loop();
        greenMp3.setVolume(0.5);
        greenMp3.isplaying = true;
      }
    } else if (currentOrder === "YELLOW") {
      image(yellowImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      blueMp3.isplaying = false;
      redMp3.isplaying = false;
      greenMp3.isplaying = false;
      blueMp3.stop();
      greenMp3.stop();
      redMp3.stop();
      if (!yellowMp3.isplaying) {
        yellowMp3.loop();
        yellowMp3.setVolume(0.5);
        yellowMp3.isplaying = true;
      }
    }
  }

  //add a smoke graphic that oscillates in its opacity
  push();
  tint(255, 127 * sin(millis() / 1000));
  image(smoke, 0, 0);
  smoke.x += smoke.speed;
  pop();

  // this displays the conveyor belt
  conveyorbelt.display();

  //this displays the dropzone
  dropzone.display();

  //for loop to get the products into the array
  for (let i = products.length - 1; i >= 0; i--) {
    let product = products[i];

    //make the products move, wrap around the screen, and display
    product.move();
    product.wrap();
    product.display();

    //delete the product from the array if it reaches the top of the screen (for the dropzone)
    if (product.isOffScreen === true) {
      products.splice(i, 1);
    }
  }

  //this displays the Rentbar
  rentbar.display();

  //display tv, make it wiggle
  image(tv, tvProps.x, tvProps.y, tvProps.h, tvProps.w);
  tvProps.x += sin(millis() / 100);
  tvProps.y += sin(millis() / 150);

  //noise overlay
  push();
  blendMode(SCREEN);
  image(noiseOverlay, 0, 0);
  pop();

  //this begins the main counter for the game
  gameCounter = millis();

  //divide the millis into an integer
  gameCounter = int(gameCounter / 1000);

  //make the numbers descend
  countDown = maxTime - gameCounter;

  //this draws the gameTimer
  push();
  textFont(gameTimerFont);
  fill(255);
  stroke(0);
  textSize(100);
  text(countDown, gameTimerXY.x, gameTimerXY.y);
  pop();

  //this changes the gamestate if time runs out
  function gameOverCheck() {
    if (countDown <= "0" || rentbar.width <= 0) {
      state = "gameover";
    }
  }

  //this checks if enough time has passed before changing the order
  if (millis() > orderChange) {
    currentOrder = random(orders);
    let r = random(0, 1);
    orderChange = millis() + orderTimer;
  }

  //this changes the gamestate if time runs out
  function winCheck() {
    if (rentbar.width >= rentbar.win) {
      state = "win";
    }
  }
}

//this controls the drag and drop input of the mouse
function mousePressed() {
  if (state === "title") {
    if (
      mouseX > button.x - button.width / 2 &&
      mouseX < button.x + button.width / 2 &&
      mouseY > button.y - button.height / 2 &&
      mouseY < button.y + button.height / 2
    ) {
      //this causes the control card to move when we hover
      if (controlCard.x <= controlCard.xOut && controlCard.isOffScreen) {
        controlCard.x += controlCard.move;
      } else {
        controlCard.x -= controlCard.move;
        if (controlCard.x >= controlCard.xIn) {
          controlCard.x = controlCard.xIn;
        }
      }
    }

    //clicking at the title screen starts the game state
    state = "game";
  } else if (state === "game") {
    //if we're in the game state, cycle through the products array and grab us one
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      product.mousePressed();
    }
  }
}

//what happens when we release the mouse
function mouseReleased() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.isBeingDragged) {
      //check if we dropped it on the dropzone
      dropzone.checkOverlap(product);

      //check if we dropped it on the conveyorbelt or not
      conveyorbelt.checkOutOfBounds(product);
      conveyorbelt.checkOnBelt(product);

      //check if its the right colour if its on the dropzone
      dropzone.checkColour(product);
    }
    product.mouseReleased();
  }
}

//lets make sure the song is playing, and not looping on top of itself
function songCheck() {
  if (!gameSong.isplaying) {
    gameSong.play();
    gameSong.isplaying = true;
  }
}
