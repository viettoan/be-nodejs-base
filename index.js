import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './loadEnvironment.js';
import 'express-async-errors';
import {logging} from './config/logging.js';
import winston from 'winston';
import {createServer} from 'http';
import {Server} from 'socket.io';
import SocketServerHandler from './app/Socket/SocketServerHandler.js';
import router from './routes/index.js';
import multer from "multer";
import {responseErrors, responseJsonByStatus} from "./app/Common/helper.js";
// init winston logger
logging();
// connect mongoose
mongoose.connect(process.env.ATLAS_URI, {
  autoIndex: true,
}).then(() => console.log('Connected!'));
// setup express
const PORT = process.env.PORT || 5050;
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
// create the Express server
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
httpServer.listen(PORT, () => {
  console.log(
      `Server is running on port: ${PORT} and Worker ${process.pid} started`
  );
});
