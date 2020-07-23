<template>
  <div class="chat">
    <div class="messages">
      <Message v-for="(message, i) in $store.state.user.room.messages" :key="i" :message="message" />
    </div>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="messageText" placeholder="Send a message">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
  import Message from "./Message"
  export default {
    name: "Chat",
    components: {
      Message
    },
    data() {
      return {
        messageText: ""
      }
    },
    methods: {
      handleSubmit() {
        if (!this.messageText) return
        this.$socket.emit("send_message", this.messageText)
        this.messageText = "";
      }
    }
  }
</script>

<style scoped>
.messages {
  padding: 10px 20px;
  height: 80%;
  overflow-y: scroll;
}

.chat {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f3f3f3;
}


form {
  position: relative;
  height: 65px;
  width: 85%;
  margin-bottom: 15px;
}

input {
  height: 100%;
  width: 100%;
  border-radius: 0;
  padding-right: 35%;
  padding-left: 15px;
}

form button {
  position: absolute;
  right: 5px;
  bottom: 50%;
  transform: translateY(50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 30%;
}
</style>
