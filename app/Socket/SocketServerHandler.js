import AdminNamespace from "./Namespaces/Admin/AdminNamespace.js";

class SocketServerHandler
{
    handle() {
        const adminNamespace = new AdminNamespace();
        adminNamespace.handle();
    }
}

export default SocketServerHandler;