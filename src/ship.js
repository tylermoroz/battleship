export class Ship {
  constructor() {
    this.length = 0;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit++;
  }
}
