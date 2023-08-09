import express from 'express';
import {authMiddleware} from '../../app/Http/Middlewares/AuthMiddleware.js';
import RoomController from "../../app/Http/Controllers/Me/RoomController.js";
import {addRoomValidator} from "../../app/Http/Requests/ChatRequest.js";

const chatRouter = (app) => {
  const router = express.Router();
  const roomController = new RoomController();
  router.use(authMiddleware);
  router.get('/my-rooms', roomController.index);
  router.post('/add-rooms', addRoomValidator, roomController.createNewRoom);

  app.use('/me/chat', router);
};

export default chatRouter;