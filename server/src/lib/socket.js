import {Server} from 'socket.io';
import http from "http";
import express from 'express';

const app = express();
const server= http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ["*"],
        methods: ["GET", "POST"],
        },
});

export function getReciverSocketId(userId){
    return usersocketMap[userId];
}

// store list of online user
const usersocketMap = {}

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);

    const userId= socket.handshake.query.userId;
    if(userId) usersocketMap[userId]= socket.id;

    io.emit("getOnlineUsers",Object.keys(usersocketMap))

    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id);
        delete usersocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(usersocketMap))
    })
})

export {io,app,server};