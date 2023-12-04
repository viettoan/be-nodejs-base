import AdminNamespace from './namespaces/admin/admin.namespace.js';

class SocketServerHandler {
  handle() {
    const adminNamespace = new AdminNamespace();
    adminNamespace.handle();
  }
}

export default SocketServerHandler;
