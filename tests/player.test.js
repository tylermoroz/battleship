import { Player } from "../src/player.js";

describe("Player", () => {
  let user;
  let npc;

  beforeEach(() => {
    user = new Player("real");
    npc = new Player("computer");
  });

  describe("Player initialization", () => {
    test("Users initialization", () => {
      expect(user.type).toBe("real");
      expect(npc.type).toBe("computer");
    });
  });
});
