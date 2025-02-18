import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

import cors from "cors";
import { Socket } from 'dgram';



const app = express();
app.use(cors());
const server = http.createServer(app);


const preWrittenMessage = [
    {
        "message": "hii",
        "reply": "hello"
    },
    {
        "message": "how are you",
        "reply": "i am fine! how are you.."
    }
];


// Initialize Socket.IO
const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000", "https://your-frontend-deployment-url.com"],
        methods: ['Get', "Post"]
    }
})

// SOcket.Io event Handeling
io.on('connection', (socket)=>{
    console.log('A user is connected', socket.id);


    //Example event: message from client
        socket.on('send_message', (data) => {
            console.log('Message recived', data);

            io.emit('backend_Message', data);

            
        })
        socket.on('backend_reply', (message)=>{
            console.log('Message recived', message);

            io.emit('receive_message', message);

        }) 
        

         // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    })


    const PORT = 3042;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    export default app



