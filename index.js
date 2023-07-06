import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import "./loadEnvironment.js";
import "express-async-errors";
import bodyParser from "body-parser";
import {logging} from "./config/logging.js";
import winston from "winston";
import { createServer } from "http";
import {Server} from "socket.io";
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import SocketServerHandler from "./app/Socket/SocketServerHandler.js";
import router from "./routes/index.js";

// init winston logger
logging();

// connect mongoose
mongoose.connect(process.env.ATLAS_URI, {
    autoIndex: true, //make this also true
}).then(() => console.log('Connected!'));

// setup express
const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

// Load routes
router(app);

// Set view engine
app.set('view engine', 'ejs');

// Global error handling
app.use((err, _req, res, next) => {
  winston.loggers.get('system').error('ERROR', err);
  res.status(500).send(err);
})

// create the Express server
const httpServer = createServer(app);

// handle socket
const socketIOServer = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_IO_CLIENT,
  }
});
export { socketIOServer }
const socketServerHandler = new SocketServerHandler();
socketServerHandler.handle();
httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} and Worker ${process.pid} started`);
});

// const numCPUs = cpus().length;
//
// //start server using cluster
// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);
//
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork()
//   }
//
//   cluster.on('exit', (worker) => {
//     console.log(`worker ${worker.process.pid} died`);
//   })
// } else {
//   httpServer.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT} and Worker ${process.pid} started`);
//   });
// }


