import express from 'express';
import {authMiddleware} from '../../src/http/middlewares/auth.middleware.js';
import RoomController from "../../src/http/controllers/me/room.controller.js";
import {addRoomValidator} from "../../src/http/validations/me/chat.validation.js";
import MessageController from "../../src/http/controllers/me/message.controller.js";
import {storeMessage} from "../../src/http/validations/me/message.validation.js";

const chatRoute = (app) => {
  const router = express.Router();
  const roomController = new RoomController();
  const messageController = new MessageController();
  router.use(authMiddleware);
  router.get('/rooms', roomController.index);
  router.post('/rooms', addRoomValidator, roomController.createNewRoom);
  router.get('/rooms/:roomId', roomController.show);
  router.post('/messages', storeMessage, messageController.store);

  app.use('/me/chat', router);
};

export default chatRoute;
