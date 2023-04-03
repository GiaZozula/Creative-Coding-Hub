const audio = new Audio("assets/soundscape.mp3");
const userVoice = new Audio("assets/uservoice.mp3");
audio.play();

//OBJECTS
let user = {
  x: 1,
  y: 1,
  vx: 0,
  vy: 0,
  speed: 1,
  width: 200,
  height: 200,
  isSinging: false,
};

let statue1 = {
  isColliding: false,
  isInRange: false,
  rangeX: -50,
  rangeY: -50,
  x: 360,
  y: 180,
  width: 1200,
  height: 800,
  hboxX: 850,
  hboxY: 560,
  hboxWidth: 80,
  hboxHeight: 90,
};

let lastImage = "assets/statue2.png";

let cloud1 = {
  x: 15,
  y: 15,
};

let cloud2 = {
  x: 1,
  y: 1,
};

let cloud3 = {
  x: 1,
  y: 1,
};

let godrays1 = {
  x: 1,
  y: 1,
};

let godrays2 = {
  x: 1,
  y: 1,
};

let eye2 = {
  x: 1,
  y: 40,
};

//VARIABLES
let KeyInput = {
  up: false,
  down: false,
  left: false,
  right: false,
};

//EVENT LISTENERS
//add event listener to see if a key is down or...
document.addEventListener("keydown", userInput);
//is a key up?
document.addEventListener("keyup", userNoInput);

//INTERVALS+
setInterval(mainLoop, 20);

//LOCAL STORAGE couldn't get it to work
// let userX = 0;
// let userY = 0;
// if (typeof storage != "undefined") userX = window.localStorage.getItem("userX");
// userY = window.localStorage.getItem("userY");

function onLoad() {
  // document.getElementById("userPicture").style.left = userX - 100 + "px";
  // document.getElementById("userPicture").style.top = userY - 100 + "px";
  user.element = document.getElementById("userPicture");
  statue1.element = document.getElementById("statuePicture");
  user.element.style.left = user.x + "px";
  user.element.style.top = user.y + "px";
  statue1.element.style.left = statue1.x + "px";
  statue1.element.style.top = statue1.y + "px";
  statue1.element.width = statue1.width;
  statue1.element.height = statue1.height;

  document.getElementById("godrays1").style.right = godrays1.x + "px";
  document.getElementById("godrays1").style.bottom = godrays1.y + "px";

  document.getElementById("godrays2").style.right = godrays2.x + "px";
  document.getElementById("godrays2").style.bottom = godrays2.y + "px";

  console.log("hello");
}

//MAIN LOOP
function mainLoop() {
  userMovement();
  cloudMovement();
  rangeDetection();
}

//KEY HANDLERS
function userInput() {
  //move image up
  if (event.keyCode == 38) {
    KeyInput.up = true;
  }
  //move image down
  else if (event.keyCode == 40) {
    KeyInput.down = true;
  }
  //move image left
  else if (event.keyCode == 37) {
    KeyInput.left = true;
  }
  //move image right
  else if (event.keyCode == 39) {
    KeyInput.right = true;
  }
  if (event.keyCode == 32) {
    userVoice.play();
  }
}

function userNoInput() {
  if (event.keyCode == 38) {
    KeyInput.up = false;
  }
  //move image down
  else if (event.keyCode == 40) {
    KeyInput.down = false;
  }
  //move image left
  else if (event.keyCode == 37) {
    KeyInput.left = false;
  }
  //move image right
  else if (event.keyCode == 39) {
    KeyInput.right = false;
  }
}

//CHANGE PLAYER POSITION
function userMovement() {
  if (KeyInput.up) {
    user.vy -= user.speed;
  } else if (KeyInput.down) {
    user.vy += user.speed;
  }

  if (KeyInput.left) {
    user.vx -= user.speed;
  } else if (KeyInput.right) {
    user.vx += user.speed;
  }

  let futurePositionX = user.x + user.vx;
  let futurePositionY = user.y + user.vy;

  if (!collisionDetection(user.x, futurePositionY)) {
    user.y = futurePositionY;
  } else {
    user.vy = -user.vy;
  }

  if (!collisionDetection(futurePositionX, user.y)) {
    user.x = futurePositionX;
  } else {
    user.vx = -user.vy;
  }

  user.vy *= 0.8;
  user.vx *= 0.8;

  user.element.style.left = user.x + "px";
  user.element.style.top = user.y + "px";
}

//DETECT COLLISIONS
function collisionDetection(x, y) {
  if (
    x < statue1.hboxX + statue1.hboxWidth &&
    x + user.width > statue1.hboxX &&
    y < statue1.hboxY + statue1.hboxHeight &&
    user.height + y > statue1.hboxY
  ) {
    // collision detected!
    // window.alert("You made it!");
    statue1.isColliding == true;
    return true;
  } else {
    statue1.isColliding == false;
    return false;
    // no collision
  }
}

function rangeDetection() {
  if (
    user.x < statue1.x + statue1.width + statue1.rangeX &&
    user.x + user.width > statue1.x - statue1.rangeX &&
    user.y < statue1.y + statue1.height + statue1.rangeY &&
    user.height + user.y > statue1.y - statue1.rangeY
  ) {
    // collision detected!
    // window.alert("You made it!");
    statue1.isInRange == true;
    console.log("working");
    document.getElementById("statuePicture").src = "assets/statue1happy.gif";
    document.getElementById("statuePicture").style.width = "562px";
    document.getElementById("statuePicture").style.height = "360px";
    document.getElementById("statuePicture").style.left = "660px";
    document.getElementById("statuePicture").style.top = "422px";

    return true;
  } else {
    statue1.isInRange == false;
    console.log("not working");
    return false;
  }
}

function cloudMovement() {
  cloud1.x += 0.25;
  cloud1.y += 0.25;

  document.getElementById("cloud1").style.right = cloud1.x + "px";
  document.getElementById("cloud1").style.bottom = cloud1.y + "px";

  cloud2.x += 0.15;
  cloud2.y += 0.15;
  document.getElementById("cloud2").style.right = cloud2.x + "px";
  document.getElementById("cloud2").style.bottom = cloud2.y + "px";

  cloud3.x -= 0.2;
  cloud3.y -= 0.2;

  document.getElementById("cloud3").style.left = cloud3.x + "px";
  document.getElementById("cloud3").style.top = cloud3.y + "px";
}
