import BaseNamespace from '../BaseNamespace.js';
import {socketIOServer} from "../../../../index.js";

class AdminNamespace extends BaseNamespace {
  constructor() {
    super('/admin');
  }

  handle() {
    socketIOServer.of(this.namespace).on("connection", (socket) => {
      socketIOServer.of(this.namespace).emit('test', {test: 111});
    });

    // console.log('admin namespace')
  }

  emitCreateNewUser(user = {}) {
    socketIOServer.of(this.namespace).emit('admin_create_new_user', user);
  }
}

export default AdminNamespace;
