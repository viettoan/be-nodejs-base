import BaseNamespace from '../BaseNamespace.js';

class AdminNamespace extends BaseNamespace {
  constructor() {
    super('/admin');
  }

  handle() {
    // console.log('admin namespace')
  }

  emitCreateNewUser(user = {}) {
    this.namespaceIO.emit('create_new_user', user);
  }
}

export default AdminNamespace;
