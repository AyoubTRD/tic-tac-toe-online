<template>
  <div>
    <div class="placeholder"></div>
    <div class="container grid">
      <div class="game">
        <Game />
        <Score />
      </div>
      <Chat />
    </div>
  </div>
</template>

<script>
import Game from "../components/Game";
import Score from "../components/Score";
import Chat from "../components/Chat";

export default {
  name: "Play",
  components: {
    Game,
    Score,
    Chat
  },
  created() {
    if (!this.$store.state.user) return this.$router.push("/");
    if (!this.$store.state.user.is_playing)
      return this.$router.push("/find-player");
  }
};
</script>

<style scoped>
.placeholder {
  padding-top: 15vh;
}
.grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.game {
  width: 50%;
  text-align: center;
  padding: 25px;
}
.container {
  height: 600px;
}

@media all and (max-width: 710px) {
  .chat {
    width: 100% !important;
  }
  .container {
    height: 900px;
  }
  .game {
    width: 100%;
  }
  .game {
    height: 55%;
  }
  .chat {
    height: 45%;
  }
}
</style>
