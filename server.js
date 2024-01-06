import './loadEnvironment.js';
import mongoDbConnect from "./database/mongodb/index.js";
import {logging} from './config/logging.js';
import {createServer} from 'http';
import {Server} from 'socket.io';
import SocketServerHandler from './src/socket/socket-server.handler.js';
import app from './app.js';
import { createAdapter } from '@socket.io/redis-adapter';
import redis from './database/redis/index.js';
import './database/mysql/index.js';
import { run } from './src/utils/kafka/consumer.js';

// init winston logger
logging();
// connect mongodb
mongoDbConnect.then(
    () => {
        console.log('MongoDB connected!')
    }
);
// create the Http server
const httpServer = createServer(app);
// handle socket
const socketIOServer = new Server(httpServer, {
    cors: {
        origin: process.env.SOCKET_IO_CLIENT,
    },
});
const pubClient = redis;
const subClient = pubClient.duplicate();
export {socketIOServer};
socketIOServer.adapter(createAdapter(pubClient, subClient));
const socketServerHandler = new SocketServerHandler();
socketServerHandler.handle();

// instruct the server to start listening for incoming HTTP requests on a specific port.
const PORT = process.env.PORT || 5050;
httpServer.listen(PORT, () => {
    console.log(
        `Server is running on port: ${PORT} and Worker ${process.pid} started`
    );
});

// run().catch('Kafka consumer error:', console.info);