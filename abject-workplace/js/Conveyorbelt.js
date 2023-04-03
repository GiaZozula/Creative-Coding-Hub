class Conveyorbelt {
  // Create a new conveyor belt object
  constructor() {
    this.x = 600;
    this.y = 600;
    this.height = 375;
    this.width = 1200;
    this.topEdge = 400;
    this.bottomEdge = 750;
    this.padding = 50;
    this.outOfBounds = false;
    this.onBelt = true;
    this.stroke = 255;
    this.fill = 0;
  }

  //display for the conveyor belt
  display() {
    push();
    rectMode(CENTER);
    stroke(this.stroke);
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  //check if the product is out of bounds
  checkOutOfBounds(product) {
    if (
      (product.x > this.x - this.width / 2 &&
        product.x < this.x + this.width / 2 &&
        product.y > this.y - this.height / 2 &&
        product.y < this.y + this.height / 2) ||
      dropzone.overlap
    ) {
      this.outOfBounds = false;
    } else {
      this.outOfBounds = true;

      //if it is out of bounds, the rent bar takes a hit!
      rentbar.width -= rentbar.increment;

      //this little chunk of code was given by Pippin to help me delete products out of the array
      let index = products.indexOf(product);
      products.splice(index, 1);
    }
  }

  //this checks if the product is on the conveyor belt after grabbing it and dropping it again
  checkOnBelt(product) {
    if (
      product.x > this.x - this.width / 2 &&
      product.x < this.x + this.width / 2 &&
      product.y > this.y - this.height / 2 &&
      product.y < this.y + this.height / 2
    ) {
      this.onBelt = true;
    } else {
      this.onBelt = false;
    }
  }
}
