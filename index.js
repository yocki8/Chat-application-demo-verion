const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("disconnect", () => {
        console.log(socket.rooms);
    });

    socket.on("join_room",(room)=>{
        socket.join(room);
    })
    
    socket.on("chat message", ({msg,room}) => {
        socket.to(room).emit("chat message", msg);
    });
    
    socket.on("typing", ({isTyping,room}) => {
        socket.to(room).emit("typing", isTyping);
        console.log(socket.rooms);
    });
});

server.listen(PORT, () => {
    console.log("listening to port: ", PORT);
});
