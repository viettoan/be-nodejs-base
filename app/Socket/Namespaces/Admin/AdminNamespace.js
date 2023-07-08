import BaseNamespace from '../BaseNamespace.js';
import {socketIOServer} from "../../../../index.js";

class AdminNamespace extends BaseNamespace {
  constructor() {
    super('/admin');
  }

  handle() {
    // console.log('admin namespace')
  }

  emitCreateNewUser(user = {}) {
    socketIOServer.of(this.namespace).emit('create_new_user', user);
  }
}

export default AdminNamespace;
