const express = require("express");
const http = require("http");
// const cors = require("cors");
const socketIO = require("socket.io");

const PORT = 4000;
const ORIGIN_URL = "http://localhost:5173";

const app = express();
const server = http.Server(app);

// app.use(cors());

const io = socketIO(server, {
    cors: {
        origin: ORIGIN_URL,
    },
});

io.on("connection", handleSocketConnection);

function handleSocketConnection(socket) {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message", handleMessage);
    socket.on("disconnect", handleDisconnect);
}

function handleMessage(data) {
    console.log(data);
    io.emit("messageResponse", data);
}

function handleDisconnect() {
    console.log("🔥: A user disconnected");
}

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});