<template>
  <div class="root">
    <notifications group="request" position="top center">
      <template slot="body" slot-scope="props">
        <div class="notification">
          <h3>{{ props.item.title || "Request to play" }}</h3>
          <p>{{ props.item.text }}</p>
          <div class="buttons" v-if="!props.item.data.hideButtons">
            <button class="refuse" @click="refuse(props)">Refuse</button>
            <button class="accept" @click="accept(props)">Accept</button>
          </div>
        </div>
      </template>
    </notifications>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    accept(props) {
      props.close();
      this.$socket.emit("accept_request_to_play", props.item.data.request);
    },
    refuse(props) {
      props.close();
      this.$socket.emit("refuse_request_to_play", props.item.data.request);
    }
  }
};
</script>

<style>
.container {
  margin: 0 35px;
  background-color: white;
  color: #333;
  border-radius: 7px;
}

.notification {
  background-color: #ffffff;
  color: #333;
  border-radius: 7px;
  padding: 20px 15px;
  border: 1px solid #eee;
  margin: 12px;
}

.notification .accept {
  background-color: #f9cb38;
  color: white;
}

.notification .refuse {
  color: #eb1751;
  background-color: #eb175000;
  transition: 0.2s;
  margin-right: 10px;
}
.notification .refuse:hover {
  background-color: #eb175023;
}

.notification h3 {
  font-size: 30px;
  margin-bottom: 15px;
}

.notification p {
  font-size: 18px;
  margin-bottom: 15px;
}

.notification button {
  padding: 10px 19px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-shadow: 0 1px #aaa;
}

h1 {
  margin-bottom: 30px;
}

@keyframes rotate {
  from {
    transform: rotateX(0deg) translate(-50%, -50%);
  }
  10% {
    transform: rotateX(-10deg) translate(-50%, -50%);
  }
  25% {
    transform: rotateX(20deg) translate(-50%, -50%);
  }
  50% {
    transform: rotateX(10deg) translate(-50%, -50%);
  }
  60% {
    transform: rotateX(-20deg) translate(-50%, -50%);
  }
  75% {
    transform: rotateX(20deg) translate(-50%, -50%);
  }
  to {
    transform: rotateX(0deg) translate(-50%, -50%);
  }
}
* {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-family: "Fredoka One", Arial, Helvetica, sans-serif;
}
body {
  color: white;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
}
body::after {
  content: "";
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400%;
  height: 400vh;
  z-index: -1;
  background: linear-gradient(to right, #24135d, #402eaa, #53430c, #640820);
  background-size: 200%;
  animation: animateGradient 12s infinite, rotate 25s infinite;
}
@keyframes animateGradient {
  from {
    background-position-x: 0;
  }
  50% {
    background-position-x: 100%;
  }
  to {
    background-position-x: 0;
  }
}
.home {
  text-align: center;
}
.red {
  color: #eb1751;
}
.yellow {
  color: #f9cb38;
}
h1 {
  font-size: 75px;
  text-transform: uppercase;
  line-height: 1;
}
form {
  width: 240px;
  margin: 10px auto;
}
input {
  padding: 18px 20px;
  width: 100%;
  background: white;
  border: none;
  color: #555;
  font-family: inherit;
  border-radius: 50px;
  margin-bottom: 15px;
}
form button {
  width: 100%;
  padding: 18px 20px;
  border: none;
  color: white;
  border-radius: 50px;
  font-family: inherit;
  background: linear-gradient(to right, #eb1751, #f9cb38, #c9093c);
  background-size: 200%;
  cursor: pointer;
  animation: animateGradient 6s infinite ease;
}
button:active {
  transform: translateY(2px);
}
</style>
