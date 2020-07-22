class Match {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.wins = {};
    this.wins[player1] = 0;
    this.wins[player2] = 0;
    this.ties = 0;
    this.X = Math.random() < 0.5 ? player1 : player2;
    this.O = this.X === player1 ? player2 : player1;
    this.currentPlayer = this.X;
    this.board = [null, null, null, null, null, null, null, null, null];
    this.status = {};
  }

  play(position) {
    if (this.board[position]) return "Hak _-|_";
    this.board[position] = this.X === this.currentPlayer ? "X" : "O";
    this.currentPlayer = this.currentPlayer === this.X ? this.O : this.X;
    return this.checkGameStatus();
  }

  checkGameStatus() {
    let gameOver = false;
    let isTie = false;
    let winner = null;

    const lines = [
      this.board.slice(0, 3),
      this.board.slice(3, 6),
      this.board.slice(6, 9),
      [this.board[0], this.board[4], this.board[8]],
      [this.board[2], this.board[4], this.board[6]],
      [this.board[0], this.board[3], this.board[6]],
      [this.board[1], this.board[4], this.board[7]],
      [this.board[2], this.board[5], this.board[8]],
    ];

    const completeLine = lines.find(
      (line) =>
        line.every((i) => !!i) && line[0] === line[1] && line[1] === line[2]
    );

    if (completeLine) {
      winner = completeLine[0] === "X" ? this.X : this.O;
      this.wins[winner]++;
      gameOver = true;
    } else {
      isTie = !this.board.includes(null);
      isTie && this.ties++;
    }
    this.status = {
      winner,
      gameOver,
      isTie,
    };

    return this.status;
  }

  resetGame() {
    this.X = Math.random() < 0.5 ? this.players[0] : this.players[1];
    this.O = this.X === this.players[0] ? this.players[1] : this.players[0];
    this.currentPlayer = this.X;
    this.board = [null, null, null, null, null, null, null, null, null];
  }
}

module.exports = Match;
