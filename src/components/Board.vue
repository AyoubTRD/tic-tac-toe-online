<template>
  <div class="board">
    <Square
      v-for="(square, i) in $store.state.user.room.match.board"
      :index="i"
      :key="i"
      :square="square"
    />
  </div>
</template>

<script>
import Square from "./Square";

export default {
  name: "Board",
  components: {
    Square
  }
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 25px;
}
</style>
