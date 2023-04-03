class Product {
  // Create a new Product object
  //it recieves x, y, vx, colour, and ovelap
  constructor(x, y, vx, colour, overlap) {
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 60;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.colour = undefined;
    this.isBeingDragged = false;
    this.canBeClicked = true;
    this.isOffScreen = false;
    this.stroke = 255;
  }

  // Move the Product according to its velocity
  //make sure it is is not being dragged and can be clicked (items on the dropzone are not able to be clicked)
  move() {
    if (!this.isBeingDragged && this.canBeClicked) {
      this.x += this.vx;
      this.y += this.vy;
      this.isBeingDragged = false;
    } else if (!this.isBeingDragged && !this.canBeClicked) {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y <= 0) {
        //check if the product is offscreen (this is for after it is placed on the dropzone)
        this.isOffScreen = true;
      }
    } else {
      this.isBeingDragged = true;
      if (this.isBeingDragged && this.canBeClicked) {
        this.x = mouseX;
        this.y = mouseY;
      }
    }
  }

  // Wrap the Product if it reaches the right edge
  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  // Display the Product
  display() {
    push();
    imageMode(CENTER);

    //link the colour of the product to the corresponding skull image
    if (this.colour === "RED") {
      image(skullr, this.x, this.y, this.width, this.height);
    } else if (this.colour === "BLUE") {
      image(skullb, this.x, this.y, this.width, this.height);
    } else if (this.colour === "YELLOW") {
      image(skully, this.x, this.y, this.width, this.height);
    } else if (this.colour === "GREEN") {
      image(skullg, this.x, this.y, this.width, this.height);
    }
    pop();
  }

  //this detects if the product is under the mouse, can be clicked, and if so, tells us we're dragging it
  mousePressed() {
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2 &&
      this.canBeClicked
    ) {
      this.isBeingDragged = true;
    }

    {
      //this is a debugger I added to make sure that the colours are being assigned correctly
      if (this.isBeingDragged && this.colour == "RED") {
        print("RED");
      } else if (this.isBeingDragged && this.colour == "BLUE") {
        print("BLUE");
      } else if (this.isBeingDragged && this.colour == "YELLOW") {
        print("YELLOW");
      } else if (this.isBeingDragged && this.colour == "GREEN") {
        print("GREEN");
      }
    }
  }
  //let go of the mouse and its no longer being dragged
  mouseReleased() {
    this.isBeingDragged = false;
  }
}
