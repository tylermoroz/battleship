import { Ship } from "../src/ship.js";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  describe("Ship initialization", () => {
    test("ship object properties on creation", () => {
      expect(ship.length).toBe(3);
      expect(ship.timesHit).toBe(0);
      expect(ship.sunk).toBe(false);
    });
  });

  describe("Hit behavior", () => {
    test("increments timesHit for each successful hit", () => {
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.timesHit).toBe(3);
    });

    test("marks ship as sunk when timesHit equals length", () => {
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.sunk).toBe(true);
    });
  });
});
