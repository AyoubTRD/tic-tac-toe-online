const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

const io = require("socket.io")(server);

const Room = require("./classes/Room");

const sockets = {};

function getUsersData() {
  return Object.values(sockets).map((socket) => getUserData(socket));
}

function getUserData(socket) {
  return {
    ...socket.data,
    opponent: socket.data.opponent && {
      ...socket.data.opponent.data,
      opponent: undefined,
    },
  };
}

function getRooms() {
  return Object.values(sockets)
    .map((socket) => socket.room)
    .filter((room) => !!room);
}

io.on("connect", async (socket) => {
  console.log("A new user connected");
  let name = "";
  socket.data = {
    name,
    is_playing: false,
    opponent: null,
    room: null,
  };
  socket.on("signup", (userName) => {
    console.log(userName + " is trying to connect");
    if (!userName || sockets[userName]) {
      console.log("this name is already taken buddy");
      return socket.emit("name_taken");
    }
    name = userName;
    socket.data.name = name;
    sockets[name] = socket;
    io.emit("users", getUsersData());
    socket.emit("self", getUserData(socket));
    console.log(`Adding ${userName} to users`);
  });
  io.emit("users", getUsersData());

  socket.on("disconnect", () => {
    delete sockets[name];
    if (!socket.room) return;
    socket.room = {};
    socket.data.opponent.room = {};
    socket.data.is_playing = false;
    socket.data.opponent.data.is_playing = false;
    io.emit("users", getUsersData());
  });

  socket.on("request_to_play", (request) => {
    sockets[request.userName].emit("request_to_play", {
      userName: name,
    });
  });

  socket.on("accept_request_to_play", (request) => {
    const room = new Room(name, request.userName);
    socket.room = room;
    socket.data.room = room;
    socket.data.opponent = sockets[request.userName];
    socket.data.opponent.room = room;
    socket.data.opponent.data.room = room;
    socket.data.opponent.data.opponent = socket;
    socket.data.is_playing = true;
    socket.data.opponent.data.is_playing = true;
    socket.data.opponent.emit("accept_request_to_play", request);
    io.emit("users", getUsersData());
  });

  socket.on("refuse_request_to_play", (request) => {
    sockets[request.userName].emit("refuse_request_to_play", {
      userName: socket.data.name,
    });
    io.emit("users", getUsersData());
  });

  socket.on("play", (position) => {
    console.log("playing");
    if (!socket.data.room || socket.data.room.match.currentPlayer !== name)
      return;
    console.log(position);
    socket.room.match.play(position);
    socket.emit("update_room", socket.room);
    socket.data.opponent.emit("update_room", socket.room);
  });

  socket.on("restart_match", () => {
    if (!socket.data.room) return;
    socket.room.match.resetGame();
    socket.emit("update_room", socket.room);
    socket.data.opponent.emit("update_room", socket.room);
  });

  socket.on("leave_room", () => {
    if (!socket.data.room) return;
    socket.room = {};
    socket.data.opponent.room = {};
    socket.data.is_playing = false;
    socket.data.opponent.data.is_playing = false;
    io.emit("users", getUsersData());
  });

  socket.on("send_message", (message) => {
    if (!socket.room) return;
    socket.room.messages.push({
      message,
      createdAt: new Date(),
      from: name,
    });
    socket.emit("update_room", socket.room);
    socket.data.opponent.emit("update_room", socket.room);
  });
});

// Client connects to server
// Client receives all currently connected users
// Every user has a status of in a game, or not in a game
// If a user is not a room, the currently connected user can send a request to that user to play with him
// Client sends server request to play with someone
// Server sends a request to the other user telling him that someone wants to play with him
// If user accepts, the two players join a room
// If user refuses, we let the user who requested know
// The room stores the current match, X and O
// Handle the logic of the game
// The room stores the number of wins that every player has, and the number of ties
// The room stores messages between the two players

// Would be good if added:
// Ability to spectate two players who are in a room
// Spectators can send messages
// Spectators can be kicked by room owners
