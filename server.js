// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = new Map(); // Store room data including code

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("createRoom", (roomId) => {
    rooms.set(roomId, { users: [], code: "// Start coding here..." });
    socket.join(roomId);
    socket.emit("roomUsers", []);
    socket.emit("codeUpdate", "// Start coding here...");
  });

  socket.on("joinRoom", (roomId) => {
    const room = rooms.get(roomId);

    if (!room) {
      socket.emit("roomError", "Room does not exist");
      return;
    }

    if (room.users.length >= 5) {
      socket.emit("roomFull");
      return;
    }

    const user = {
      id: socket.id,
      username: `User_${socket.id.slice(0, 4)}`,
    };

    room.users.push(user);
    socket.join(roomId);
    io.to(roomId).emit("roomUsers", room.users);
    socket.emit("codeUpdate", room.code); // Send current code to new user
  });

  socket.on("codeChange", ({ roomId, code }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.code = code;
      socket.to(roomId).emit("codeUpdate", code); // Broadcast to all except sender
    }
  });

  socket.on("disconnect", () => {
    rooms.forEach((room, roomId) => {
      const userIndex = room.users.findIndex((user) => user.id === socket.id);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        io.to(roomId).emit("roomUsers", room.users);
        if (room.users.length === 0) {
          rooms.delete(roomId);
        }
      }
    });
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
