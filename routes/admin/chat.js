import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import RoomController from "../../app/Http/Controllers/Me/RoomController.js";
import {addRoomValidator} from "../../app/Http/Validations/Me/ChatValidation.js";
import MessageController from "../../app/Http/Controllers/Me/MessageController.js";
import {storeMessage} from "../../app/Http/Validations/Me/MessageValidation.js";

const chatRouter = (app) => {
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

export default chatRouter;
