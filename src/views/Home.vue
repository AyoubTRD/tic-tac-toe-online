<template>
  <div class="home">
    <div class="placeholder"></div>

    <h1>
      <span class="yellow">T</span>
      <span class="red">I</span>
      <span class="yellow">C</span>
      <br />
      <span class="red">T</span>
      <span class="yellow">A</span>
      <span class="red">C</span>
      <br />
      <span class="yellow">T</span>
      <span class="red">O</span>
      <span class="yellow">E</span>
    </h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="What's your name?" v-model="name" />
      <button type="submit">Start playing</button>
    </form>
    <p v-if="$store.state.signupError" class="red">{{ $store.state.signupError }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions(["signup"]),
    handleSubmit() {
      this.signup({ socket: this.$socket, name: this.name });
    }
  },
  components: {},
  data() {
    return {
      name: ""
    };
  },
  created() {
    if (this.$store.state.user && this.$store.state.user.is_playing)
      return this.$router.push("/play");
    if (this.$store.state.user) return this.$router.push("/find-player");
  }
};
</script>

<style scoped>
.placeholder {
  padding-top: 15vh;
}
</style>