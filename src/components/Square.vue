<template>
  <div class="square" :data-index="index" @click="handleClick">
    <span :class="square"></span>
  </div>
</template>

<script>
export default {
  name: "Square",
  props: ["index", "square"],
  methods: {
    handleClick() {
      this.$socket.emit("play", this.index);
    }
  }
};
</script>

<style scoped>
.square {
  border-color: #999;
  height: 100%;
  width: 100%;
  border-style: solid;
  border-width: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.X,
.O {
  width: 85%;
  height: 85%;
  position: relative;
}

.O {
  border: 8px solid #555;
  border-radius: 100%;
}

.X::before,
.X::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 8px;
  background-color: #555;
  border-radius: 10px;
}

.X::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.X::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

[data-index="0"],
[data-index="1"],
[data-index="3"],
[data-index="4"],
[data-index="6"],
[data-index="7"] {
  border-right-width: 3px;
}

[data-index="3"],
[data-index="4"],
[data-index="5"] {
  border-top-width: 3px;
  border-bottom-width: 3px;
}
</style>
