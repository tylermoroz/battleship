import { Player } from "../src/player.js";

describe("Player", () => {
  let user;
  let npc;

  beforeEach(() => {
    user = new Player("real", 10);
    npc = new Player("computer", 10);
  });

  describe("Player initialization", () => {
    test("Users initialization", () => {
      expect(user.type).toBe("real");
      expect(npc.type).toBe("computer");

      expect(user.gameBoard.size).toBe(10);
      expect(npc.gameBoard.size).toBe(10);
    });
  });
});
