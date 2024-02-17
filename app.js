import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import http from "node:http";
import cors from 'cors'


const app=express()
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors: {
        origin: "http://localhost:5173",
        }
});

app.disable('x-powered-by')


app.use(json())
app.use(corsMiddleware())
app.use('/movies',moviesRouter)

io.on("connection", (socket) => {
    socket.on("chat message", (body) => {
        socket.broadcast.emit("chat message", {
        body,
        from: socket.id.slice(8),
            
        });
    });
});


const PORT = process.env.PORT ?? 1234

server.listen(PORT,()=>{
    console.log( `Server listenign on port: http://localhost:${PORT}` )
})