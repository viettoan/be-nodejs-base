import express from 'express';
import cors from 'cors';
import './loadEnvironment.js';
import {logging} from './config/logging.js';
import winston from 'winston';
import {createServer} from 'http';
import {Server} from 'socket.io';
import SocketServerHandler from './app/Socket/SocketServerHandler.js';
import router from './routes/index.js';
import multer from "multer";
import {responseErrors, responseJsonByStatus} from "./app/Common/helper.js";
import mongoDbConnect from "./database/mongodb.js";
// init winston logger
logging();
// connect mongodb
mongoDbConnect();
// setup express
const app = express();
// third-party middleware: config cors
app.use(cors());
// built-in middleware: parse request body application/json
app.use(express.json());
// built-in middleware: parse request body application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
// built-in middleware: setup static folder
app.use(express.static('storage/users/avatars'));
app.use(express.static('public'));
// Load routes
router(app);
// Set view engine
app.set('view engine', 'ejs');
// error handling middleware
app.use((err, _req, res, next) => {
  if (!(err instanceof multer.MulterError)) {
    winston.loggers.get('system').error('ERROR', err);
  }
  return responseJsonByStatus(
    res,
    responseErrors(err.statusCode, err.message),
    err.statusCode
  )
});
// create the Http server
const httpServer = createServer(app);

// handle socket
const socketIOServer = new Server(httpServer, {
  cors: {
    origin: process.env.SOCKET_IO_CLIENT,
  },
});
export {socketIOServer};
const socketServerHandler = new SocketServerHandler();
socketServerHandler.handle();

// instruct the server to start listening for incoming HTTP requests on a specific port.
const PORT = process.env.PORT || 5050;
httpServer.listen(PORT, () => {
  console.log(
      `Server is running on port: ${PORT} and Worker ${process.pid} started`
  );
});
