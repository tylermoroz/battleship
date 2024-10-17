import { Ship } from "../src/ship.js";

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship();
  });

  test("increase the timesHit property by 1 for every successful call", () => {
    ship.hit();
    expect(ship.timesHit).toBe(1);
  });
});
