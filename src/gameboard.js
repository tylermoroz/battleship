export class Gameboard {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid(size);
  }

  createGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(null));
  }
}
