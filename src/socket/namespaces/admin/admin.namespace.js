import BaseNamespace from '../base.namespace.js';
import {socketIOServer} from "../../../../server.js";
import { sprintf } from "sprintf-js";
import {ROOMS} from "../../../../config/socket.js";
import MessageService from "../../../services/message.service.js";
import {responseErrors, responseSuccess} from "../../../common/helper.js";
import {authMiddleware} from "../../middlewares/auth.middleware.js";

class AdminNamespace extends BaseNamespace {
  constructor() {
    super('/admin');
    this.messageService = new MessageService();
  }

  handle() {
    socketIOServer.of(this.namespace).use(authMiddleware).on("connection", (socket) => {
      socket.on('join_room', data => {
        socket.join(sprintf(ROOMS.name, {roomId: data.room_id}));
      });
      socket.on('send_message', async data => {
        try {
          const newMessage = await this.messageService.store(data);
          socketIOServer.of(this.namespace).to(sprintf(ROOMS.name, {roomId: data.room_id})).emit('new_message', responseSuccess(newMessage))
        } catch (e) {
          socket.emit('send_message_error', responseErrors(500, e.message))
        }
      })
    });

    // console.log('admin namespace')
  }

  emitCreateNewUser(user = {}) {
    socketIOServer.of(this.namespace).emit('admin_create_new_user', user);
  }
}

export default AdminNamespace;
