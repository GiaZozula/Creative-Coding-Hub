class Rentbar {
  //create the rentbar class!
  constructor(x, y) {
    //this is the default placement and size of the bar's "frame"/stroke (ended up removing this)
    this.x = 60;
    this.y = 60;
    this.framewidth = 500;
    this.width = 20;
    this.height = 50;
    //if the bar reaches this number or less, gameover.
    this.min = -1;

    //this is the amount that is added or subtracted for correct or incorrect orders being dropped
    this.increment = 28.75;
    this.rent = false;
    this.food = false;
    this.childcare = false;
    this.healthcare = false;
    this.win = 480; //480 is full
  }

  // Display the Rentbar
  display() {
    push();
    fill(32, 32, 32);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    pop();

    //put a gross frame over top
    image(grossFrame, 0, 0);
  }
}
