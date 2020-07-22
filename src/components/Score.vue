<template>
  <div class="score" v-if="$store.state.user.is_playing">
    <div>
      <h5>Wins</h5>
      <p>{{ $store.state.user.room.match.wins[$store.state.user.name] }}</p>
    </div>
    <div>
      <h5>Ties</h5>
      <p>{{ $store.state.user.room.match.ties }}</p>
    </div>
    <div>
      <h5>Losses</h5>
      <p>{{ $store.state.user.room.match.wins[$store.state.user.opponent.name] }}</p>
    </div>
  </div>
</template>

<style scoped>
.score {
  display: flex;
  justify-content: space-between;
}
.score div {
  text-align: center;
  flex: 1;
}
h5 {
  font-size: 18px;
}
p {
  font-size: 25px;
}
</style>