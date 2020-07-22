const Match = require("./Match");

class Room {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.messages = [];
    this.match = new Match(player1, player2);
  }

  sendMessage(player, message) {
    this.messages.push({
      from: player,
      message,
    });
  }
}

module.exports = Room;
