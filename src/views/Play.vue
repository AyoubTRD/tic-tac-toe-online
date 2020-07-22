<template>
  <div>
    <div class="placeholder"></div>
    <div class="container grid">
      <div class="game">
        <Game />
        <Score />
      </div>
      <div class="chat">
        <Chat />
      </div>
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
}
.chat {
  width: 30%;
}
.game {
  width: 64%;
}
</style>