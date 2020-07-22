<template>
  <div>
    <div class="placeholder"></div>
    <div class="find-player container">
      <div class="welcome">
        <p>Welcome {{ $store.state.user && $store.state.user.name }}</p>
      </div>
      <div v-if="$store.state.users.length">
        <h3>Who do you want to play with?</h3>
        <div class="players">
          <div
            class="player"
            v-for="player in $store.state.users"
            :key="player.name"
            :disabled="player.is_playing"
            @click="!player.is_playing && sendRequest(player)"
          >
            <img :src="player.avatar" :alt="player.name + '\'s avatar'" />
            <span>
              {{ player.name }}
              <span class="extra yellow">is playing with l'oeuf</span>
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>No one is online</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindPlayer",
  created() {
    if (!this.$store.state.user) return this.$router.push("/");
    if (this.$store.state.user.is_playing) return this.$router.push("/play");
  },
  methods: {
    sendRequest(player) {
      this.$socket.emit("request_to_play", { userName: player.name });
    }
  }
};
</script>

<style scoped>
h3 {
  font-size: 40px;
}

.players {
  margin-top: 30px;
}

.player {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  height: 70px;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.2s;
}

.player .extra {
  font-size: 12px;
}

.player img {
  height: 60px;
  width: 60px;
  margin-right: 10px;
}

.player:not([disabled]):hover {
  background: #eee;
}

@keyframes welcome {
  from {
    top: -100%;
  }
  40% {
    top: 10vh;
  }
  60% {
    top: 10vh;
  }
  to {
    top: -100%;
  }
}

.welcome {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  padding: 25px;
  color: #333;
  font-size: 45px;
  animation: welcome 4s both;
  background: white;
  width: 90%;
  border-radius: 10px;
}
.find-player {
  background: white;
  margin-top: 15vh;
  padding: 25px;
  border-radius: 10px;
  color: #333;
}
</style>