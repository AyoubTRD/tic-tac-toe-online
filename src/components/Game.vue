<template>
  <div>
    <Board />
    <div class="gameOver" v-if="$store.state.user.room.match.status.gameOver">
      <p v-if="$store.state.user.room.match.status.winner === $store.state.user.name" class="big">
        You have won 🥳
      </p>
      <p v-else class="big">
        You have lost 😭
      </p>
      <button type="button" @click="handlePlayAgain">Play again</button>
    </div>
    <div class="turn" v-else>
      <p class="medium">{{ $store.state.user.room.match.currentPlayer === $store.state.user.name ? "It's your turn" : `It's ${$store.state.user.opponent.name}'s turn` }}</p>    </div>
  </div>
</template>

<script>
import Board from "./Board";

export default {
  name: "Game",
  components: {
    Board
  },
  methods: {
    handlePlayAgain() {
      this.$socket.emit("restart_match")
    }
  }
};
</script>

<style scoped>
.big {
  font-size: 43px;
}
.medium {
  font-size: 25px;
}
</style>
