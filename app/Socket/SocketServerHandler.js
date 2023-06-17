import {socketIOServer} from "../../index.js";
import AdminNamespace from "./Namespaces/Admin/AdminNamespace.js";

class SocketServerHandler
{
    handle() {
        socketIOServer.on('connection', (socket) => {
            socket.emit('store_user', {test:'test'})
        })
        const adminNamespace = new AdminNamespace();
        adminNamespace.handle();
    }
}

export default SocketServerHandler;